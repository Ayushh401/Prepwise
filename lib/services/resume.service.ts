"use server";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";
import { revalidatePath } from "next/cache";

export async function uploadAndParseResume(userId: string, formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) throw new Error("No file provided");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Parse PDF using Gemini (Multi-modal)
    // This is much more robust than Node-based PDF libraries which often have canvas dependencies
    const { text: extractedText } = await generateText({
      model: google("gemini-2.0-flash"),

      messages: [

        {
          role: "user",
          content: [
            { type: "text", text: "Please extract all professional information and text from this resume PDF. Return only the extracted text content." },
            {
              type: "file",
              data: buffer,
              mimeType: "application/pdf",
            },
          ],
        },
      ],
    });

    if (!extractedText) throw new Error("Could not extract text from resume");

    if (!db) throw new Error("Database connection not initialized");

    // Update user in Firestore
    await db.collection("users").doc(userId).update({
      resumeContent: extractedText,
      resumeFileName: file.name,
      updatedAt: new Date().toISOString(),
    });

    revalidatePath("/dashboard");
    return { success: true, message: "Resume scanned and saved successfully!" };
  } catch (error: any) {
    console.error("Error parsing resume with Gemini:", error);
    return { success: false, message: error.message || "Failed to scan resume" };
  }
}
