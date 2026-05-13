"use client";

import { Mail, MapPin, Phone, Sparkles } from "lucide-react";

const ResumeDetails = ({ user }: { user: User }) => {
  const parsed = user.resumeParsed;

  if (!user.resumeContent) {
    return (
      <div className="p-8 text-center text-light-400 border border-dashed border-border rounded-2xl italic">
        Upload a resume to see extracted details here.
      </div>
    );
  }

  return (
    <div className="dark-gradient rounded-[2rem] p-8 md:p-10 border border-border space-y-6">
      <div className="flex items-center gap-3">
        <Sparkles className="w-6 h-6 text-primary-200" />
        <h2 className="text-2xl font-bold">Resume Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border/60 bg-dark-300/40 p-4">
          <p className="text-xs text-light-400 mb-1">Full Name</p>
          <p className="font-semibold">{parsed?.fullName || user.name || "-"}</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-dark-300/40 p-4">
          <p className="text-xs text-light-400 mb-1 flex items-center gap-2"><Mail className="w-4 h-4" /> Email</p>
          <p className="font-semibold break-all">{parsed?.email || user.email || "-"}</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-dark-300/40 p-4">
          <p className="text-xs text-light-400 mb-1 flex items-center gap-2"><Phone className="w-4 h-4" /> Phone</p>
          <p className="font-semibold">{parsed?.phone || "-"}</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-dark-300/40 p-4">
          <p className="text-xs text-light-400 mb-1 flex items-center gap-2"><MapPin className="w-4 h-4" /> Location</p>
          <p className="font-semibold">{parsed?.location || "-"}</p>
        </div>
      </div>

      {parsed?.summary && (
        <div className="rounded-xl border border-border/60 bg-dark-300/40 p-4">
          <p className="text-xs text-light-400 mb-1">Introduction</p>
          <p className="text-sm text-light-100">{parsed.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border/60 bg-dark-300/40 p-4">
          <p className="text-xs text-light-400 mb-2">Education</p>
          <ul className="space-y-1 text-sm">
            {(parsed?.education?.length ? parsed.education : ["Not detected"]).map((item, idx) => (
              <li key={`${item}-${idx}`} className="text-light-100">{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border/60 bg-dark-300/40 p-4">
          <p className="text-xs text-light-400 mb-2">Skills</p>
          <div className="flex flex-wrap gap-2">
            {(parsed?.skills?.length ? parsed.skills : ["Not detected"]).map((skill, idx) => (
              <span key={`${skill}-${idx}`} className="text-xs px-2 py-1 rounded-md bg-primary-200/10 text-primary-100 border border-primary-200/20">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-dark-300/40 p-4">
        <p className="text-xs text-light-400 mb-2">Job Experience</p>
        <ul className="space-y-2 text-sm list-disc pl-4">
          {(parsed?.experience?.length ? parsed.experience : ["Not detected"]).map((item, idx) => (
            <li key={`${item}-${idx}`} className="text-light-100">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResumeDetails;
