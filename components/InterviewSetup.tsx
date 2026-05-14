"use client";

import { useState } from "react";
import Agent from "@/components/Agent";
import DurationSelector from "@/components/DurationSelector";

interface InterviewSetupProps {
  user: User;
  role?: string;
}

const InterviewSetup = ({ user, role }: InterviewSetupProps) => {
  const [duration, setDuration] = useState(30);

  return (
    <>
      <div className="mb-6">
        <DurationSelector duration={duration} onChange={setDuration} />
      </div>

      <Agent
        userName={user.name}
        userId={user.id}
        resumeContent={user.resumeContent}
        role={role}
        type="generate"
        duration={duration}
      />
    </>
  );
};

export default InterviewSetup;