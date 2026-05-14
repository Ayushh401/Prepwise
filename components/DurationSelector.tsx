"use client";

import { cn } from "@/lib/utils";

interface DurationSelectorProps {
  duration: number;
  onChange: (duration: number) => void;
}

const durations = [
  { value: 15, label: "15 min" },
  { value: 30, label: "30 min" },
  { value: 45, label: "45 min" },
  { value: 60, label: "1 hour" },
];

const DurationSelector = ({ duration, onChange }: DurationSelectorProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-light-100">Interview Duration</label>
      <div className="flex gap-2">
        {durations.map((d) => (
          <button
            key={d.value}
            type="button"
            onClick={() => onChange(d.value)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              duration === d.value
                ? "bg-primary-200 text-dark-100"
                : "bg-dark-200 text-light-100 hover:bg-dark-300"
            )}
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DurationSelector;