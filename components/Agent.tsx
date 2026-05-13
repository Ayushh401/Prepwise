"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";

function getVapiErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (error && typeof error === "object") {
    const obj = error as Record<string, unknown>;
    if (typeof obj.message === "string") return obj.message;
    if ("error" in obj) return String(obj.error);
  }
  return typeof error === "string" ? error : "Something went wrong starting the call.";
}

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  resumeContent,
  role,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: unknown) => {
      console.error("Vapi error:", error);
      const msg = getVapiErrorMessage(error);
      if (/transient assistant|doesn't allow transient/i.test(msg)) {
        toast.error(
          'Vapi blocks inline assistants for this key. Create an Assistant in the Vapi dashboard, set NEXT_PUBLIC_VAPI_ASSISTANT_ID to its ID, and use the same variables as in constants (questions, role, resume).'
        );
      } else if (/403|forbidden/i.test(msg)) {
        toast.error(
          "Vapi rejected this call (403). If the message says transient assistant, add NEXT_PUBLIC_VAPI_ASSISTANT_ID. Otherwise confirm you use the Public API key and restart the dev server."
        );
      } else {
        toast.error(msg);
      }
      setCallStatus(CallStatus.INACTIVE);
    };

    const onCallStartFailed = (event: { error?: string; context?: Record<string, unknown> }) => {
      const msg = event.error || "Call failed to start.";
      console.error("Vapi call-start-failed:", event);
      if (/transient assistant|doesn't allow transient/i.test(msg)) {
        toast.error(
          "Set NEXT_PUBLIC_VAPI_ASSISTANT_ID to a dashboard Assistant ID — your key does not allow transient (inline) assistants."
        );
      } else if (/403|forbidden/i.test(msg)) {
        toast.error(
          "Vapi 403: Use Public key, or add NEXT_PUBLIC_VAPI_ASSISTANT_ID if error mentions transient assistant."
        );
      } else {
        toast.error(msg);
      }
      setCallStatus(CallStatus.INACTIVE);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);
    vapi.on("call-start-failed", onCallStartFailed);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
      vapi.off("call-start-failed", onCallStartFailed);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("handleGenerateFeedback");

      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

  const handleCall = async () => {
    const publicKey = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN?.trim();
    if (!publicKey) {
      toast.error("Missing NEXT_PUBLIC_VAPI_WEB_TOKEN. Add your Vapi Public key from the dashboard.");
      return;
    }

    setCallStatus(CallStatus.CONNECTING);

    const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID?.trim();
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID?.trim();

    const startVoice = async (variableValues: Record<string, string>) => {
      if (assistantId) {
        await vapi.start(assistantId, { variableValues });
      } else {
        await vapi.start(interviewer, { variableValues });
      }
    };

    try {
      if (type === "generate") {
        if (workflowId) {
          await vapi.start(workflowId, {
            variableValues: {
              username: userName,
              userid: userId,
              role: role || "General",
              resume: resumeContent || "No resume provided",
            },
          });
        } else {
          const trackLabel = role || "General";
          const starterQuestions = [
            `Role focus: ${trackLabel}.`,
            "Start with a short greeting, then ask about background and motivation for this role.",
            "Ask a mix of behavioral and technical questions appropriate to the role and resume.",
            "Keep each question clear and concise for voice.",
          ];
          await startVoice({
            questions: starterQuestions.map((q) => `- ${q}`).join("\n"),
            role: trackLabel,
            resume: resumeContent || "No resume provided",
          });
        }
      } else {
        let formattedQuestions = "";
        if (questions) {
          formattedQuestions = questions
            .map((question) => `- ${question}`)
            .join("\n");
        }

        await startVoice({
          questions: formattedQuestions,
          role: role || "General",
          resume: resumeContent || "No resume provided",
        });
      }
    } catch (err) {
      console.error("handleCall:", err);
      const msg = getVapiErrorMessage(err);
      if (/transient assistant|doesn't allow transient/i.test(msg)) {
        toast.error(
          "Create an Assistant at dashboard.vapi.ai → Assistants, paste its ID in NEXT_PUBLIC_VAPI_ASSISTANT_ID, and put {{questions}}, {{role}}, {{resume}} in the system prompt (see constants/interviewer)."
        );
      } else if (/403|forbidden/i.test(msg)) {
        toast.error(
          "Vapi 403: Use the Public API key, or set NEXT_PUBLIC_VAPI_ASSISTANT_ID if the error mentions transient assistant."
        );
      } else {
        toast.error(msg);
      }
      setCallStatus(CallStatus.INACTIVE);
    }
  };



  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <>
      <div className="call-view">
        {/* AI Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        {/* User Profile Card */}
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call" onClick={() => handleCall()}>
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={() => handleDisconnect()}>
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
