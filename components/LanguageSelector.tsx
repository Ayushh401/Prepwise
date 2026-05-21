"use client";

import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  language: string;
  onChange: (language: string) => void;
}

const languages = [
  { value: "English", label: "English" },
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Hindi", label: "Hindi" },
];

const LanguageSelector = ({ language, onChange }: LanguageSelectorProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-light-100">Interview Language</label>
      <div className="flex flex-wrap gap-2">
        {languages.map((l) => (
          <button
            key={l.value}
            type="button"
            onClick={() => onChange(l.value)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              language === l.value
                ? "bg-primary-200 text-dark-100"
                : "bg-dark-200 text-light-100 hover:bg-dark-300"
            )}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
