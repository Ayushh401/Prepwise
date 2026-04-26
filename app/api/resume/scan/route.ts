import { NextResponse } from "next/server";
import { uploadAndParseResume } from "@/lib/services/resume.service";

import { getCurrentUser } from "@/lib/actions/auth.action";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const result = await uploadAndParseResume(user.id, formData);

    return NextResponse.json(result);
  } catch (error) {
    console.error("API Resume Scan Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
