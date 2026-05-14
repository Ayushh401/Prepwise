"use client";

import { cn } from "@/lib/utils";

export interface InterviewPersona {
  id: string;
  name: string;
  title: string;
  style: "professional" | "friendly" | "technical" | "tough";
  avatar: string;
  description: string;
  color: string;
}

export const personas: InterviewPersona[] = [
  {
    id: "professional",
    name: "James",
    title: "HR Director",
    style: "professional",
    avatar: "JP",
    description: "Corporate and structured interviews",
    color: "from-blue-500 to-blue-700",
  },
  {
    id: "friendly",
    name: "Emma",
    title: "Tech Lead",
    style: "friendly",
    avatar: "ET",
    description: "Warm and supportive tone",
    color: "from-pink-500 to-pink-700",
  },
  {
    id: "technical",
    name: "Jarvis",
    title: "Senior Engineer",
    style: "technical",
    avatar: "JV",
    description: "Deep technical assessments",
    color: "from-purple-500 to-purple-700",
  },
  {
    id: "tough",
    name: "Sarah",
    title: "VP of Engineering",
    style: "tough",
    avatar: "SV",
    description: "High-pressure scenarios",
    color: "from-red-500 to-red-700",
  },
];

const getInitials = (name: string) => {
  return name.split(" ").map(n => n[0]).join("").toUpperCase();
};

interface PersonaSelectorProps {
  selectedPersona: InterviewPersona | null;
  onSelect: (persona: InterviewPersona) => void;
}

export default function PersonaSelector({ selectedPersona, onSelect }: PersonaSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-8 bg-primary-200 rounded-full" />
        <div>
          <h3 className="text-xl font-bold">Choose Your Interviewer</h3>
          <p className="text-sm text-light-400">Select who will interview you</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {personas.map((persona) => (
          <button
            key={persona.id}
            onClick={() => onSelect(persona)}
            className={cn(
              "group relative p-4 rounded-2xl border-2 transition-all duration-300",
              "hover:scale-105 hover:shadow-xl",
              selectedPersona?.id === persona.id
                ? "border-primary-200 bg-primary-200/10"
                : "border-border bg-dark-200 hover:border-primary-200/50"
            )}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className={cn(
                  "w-16 h-16 rounded-full bg-gradient-to-br flex items-center justify-center border-2 border-border group-hover:border-primary-200 transition-colors",
                  persona.color
                )}>
                  <span className="text-white font-bold text-lg">{getInitials(persona.avatar)}</span>
                </div>
                {selectedPersona?.id === persona.id && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary-200 rounded-full flex items-center justify-center">
                    <span className="text-dark-100 text-xs">✓</span>
                  </div>
                )}
              </div>

              <div className="text-center">
                <p className="font-bold text-light-100">{persona.name}</p>
                <p className="text-xs text-light-400">{persona.title}</p>
              </div>

              <p className="text-xs text-light-400 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                {persona.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {selectedPersona && (
        <div className="mt-6 p-4 rounded-xl bg-dark-200 border border-border">
          <p className="text-sm text-light-400">
            Selected: <span className="text-primary-200 font-semibold">{selectedPersona.name}</span>
            <span className="mx-2">•</span>
            {selectedPersona.description}
          </p>
        </div>
      )}
    </div>
  );
}