"use server";

import { uploadAndParseResume as scanService } from "@/lib/services/resume.service";

export async function uploadAndParseResume(userId: string, formData: FormData) {
    return await scanService(userId, formData);
}
