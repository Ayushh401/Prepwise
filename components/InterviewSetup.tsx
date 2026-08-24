"use client";

import { useState } from "react";
import Agent from "@/components/Agent";
import DurationSelector from "@/components/DurationSelector";
import LanguageSelector from "@/components/LanguageSelector";
import { Textarea } from "@/components/ui/textarea";
import PersonaSelector, { InterviewPersona } from "@/components/PersonaSelector";

interface InterviewSetupProps {
  user: User;
  role?: string;
}

const InterviewSetup = ({ user, role }: InterviewSetupProps) => {
  const [duration, setDuration] = useState(30);
  const [language, setLanguage] = useState("English");
  const [additionalContext, setAdditionalContext] = useState("");
  const [selectedPersona, setSelectedPersona] = useState<InterviewPersona | null>(null);

  return (
    <>
      <PersonaSelector selectedPersona={selectedPersona} onSelect={setSelectedPersona} />

      <div className="my-8 flex justify-between flex-wrap gap-4">
        <DurationSelector duration={duration} onChange={setDuration} />
        <LanguageSelector language={language} onChange={setLanguage} />
      </div>

      <div className="my-8 flex flex-col gap-2">
        <label className="text-sm font-medium text-light-100">Additional Context (Optional)</label>
        <Textarea
          placeholder="Briefly describe what you'd like to focus on... (e.g. Focus on my React experience, ask a lot of system design questions, etc.)"
          value={additionalContext}
          onChange={(e) => setAdditionalContext(e.target.value)}
          className="bg-dark-200 border-none text-light-100 placeholder:text-light-200/50 min-h-[100px]"
        />
      </div>

      <Agent
        userName={user.name}
        userId={user.id}
        resumeContent={user.resumeContent}
        role={role}
        type="generate"
        duration={duration}
        persona={selectedPersona}
        language={language}
        additionalContext={additionalContext}
      />
    </>
  );
};

export default InterviewSetup;