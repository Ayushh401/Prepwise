"use server";

import { db } from "@/firebase/admin";
import { revalidatePath } from "next/cache";

function extractResumeDetails(text: string): ResumeParsed {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const firstLine = lines[0] || "";
  const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)?.[0];
  const phoneMatch = text.match(/(\+?\d[\d\s\-()]{8,}\d)/)?.[0];

  const sectionLine = (section: string) =>
    lines.findIndex((line) => line.toLowerCase() === section.toLowerCase());

  const collectSectionLines = (startIdx: number, max = 6) => {
    if (startIdx < 0) return [];
    const collected: string[] = [];
    for (let i = startIdx + 1; i < lines.length && collected.length < max; i++) {
      const value = lines[i];
      if (/^(experience|project|projects|skills|education|certification|summary)$/i.test(value)) break;
      collected.push(value.replace(/^[-*]\s*/, ""));
    }
    return collected.filter(Boolean);
  };

  const skillsStart = sectionLine("skills");
  const educationStart = sectionLine("education");
  const summaryStart = sectionLine("summary");
  const experienceStart = lines.findIndex((line) =>
    /^(experience|work experience|professional experience)$/i.test(line)
  );

  const skills = collectSectionLines(skillsStart, 8)
    .flatMap((line) => line.split(/[,|]/g).map((part) => part.trim()))
    .filter(Boolean)
    .slice(0, 20);

  const education = collectSectionLines(educationStart, 6);
  const summary = collectSectionLines(summaryStart, 3).join(" ").slice(0, 300);
  const experience = collectSectionLines(experienceStart, 10);

  const locationCandidate = lines.find((line) =>
    /(india|usa|united states|bihar|delhi|mumbai|bangalore|hyderabad|pune|address|location)/i.test(line)
  );

  return {
    fullName: firstLine && firstLine.length < 60 ? firstLine : undefined,
    email: emailMatch,
    phone: phoneMatch?.replace(/\s+/g, " ").trim(),
    location: locationCandidate,
    summary: summary || undefined,
    education: education.length ? education : undefined,
    skills: skills.length ? skills : undefined,
    experience: experience.length ? experience : undefined,
  };
}

function removeUndefinedDeep<T>(value: T): T {
  if (Array.isArray(value)) {
    return value
      .map((item) => removeUndefinedDeep(item))
      .filter((item) => item !== undefined) as T;
  }

  if (value && typeof value === "object") {
    const cleaned = Object.entries(value as Record<string, unknown>).reduce(
      (acc, [key, val]) => {
        const cleanedValue = removeUndefinedDeep(val);
        if (cleanedValue !== undefined) {
          acc[key] = cleanedValue;
        }
        return acc;
      },
      {} as Record<string, unknown>
    );
    return cleaned as T;
  }

  return value;
}

export async function uploadAndParseResume(userId: string, formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) throw new Error("No file provided");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Parse PDF locally to avoid model quota/rate-limit issues.
    const pdfParseModule = await import("pdf-parse/lib/pdf-parse.js");
    const parsePdf = (pdfParseModule as any).default ?? (pdfParseModule as any);
    const parsedPdf = await parsePdf(buffer);
    const extractedText = parsedPdf.text?.trim();

    if (!extractedText) throw new Error("Could not extract text from resume");
    const resumeParsed = removeUndefinedDeep(extractResumeDetails(extractedText));

    if (!db) throw new Error("Database connection not initialized");

    // Update user in Firestore
    await db.collection("users").doc(userId).update({
      resumeContent: extractedText,
      resumeParsed,
      resumeFileName: file.name,
      updatedAt: new Date().toISOString(),
    });

    revalidatePath("/dashboard");
    return { success: true, message: "Resume scanned and saved successfully!" };
  } catch (error: any) {
    console.error("Error parsing resume:", error);
    return { success: false, message: error.message || "Failed to scan resume" };
  }
}
