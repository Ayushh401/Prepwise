"use client";

import { useState } from "react";
import Agent from "@/components/Agent";
import DurationSelector from "@/components/DurationSelector";
import PersonaSelector, { InterviewPersona } from "@/components/PersonaSelector";

interface InterviewSetupProps {
  user: User;
  role?: string;
}

const InterviewSetup = ({ user, role }: InterviewSetupProps) => {
  const [duration, setDuration] = useState(30);
  const [selectedPersona, setSelectedPersona] = useState<InterviewPersona | null>(null);

  return (
    <>
      <PersonaSelector selectedPersona={selectedPersona} onSelect={setSelectedPersona} />

      <div className="my-8">
        <DurationSelector duration={duration} onChange={setDuration} />
      </div>

      <Agent
        userName={user.name}
        userId={user.id}
        resumeContent={user.resumeContent}
        role={role}
        type="generate"
        duration={duration}
        persona={selectedPersona}
      />
    </>
  );
};

export default InterviewSetup;