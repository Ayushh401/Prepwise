import { NextResponse } from "next/server";
import { getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // 'personal' or 'latest'
    const limit = parseInt(searchParams.get("limit") || "10");

    if (type === "personal") {
      if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
      const interviews = await getInterviewsByUserId(user.id);
      return NextResponse.json({ success: true, interviews });
    }

    const interviews = await getLatestInterviews({ 
        userId: user?.id || "", 
        limit 
    });
    return NextResponse.json({ success: true, interviews });
  } catch (error) {
    console.error("API Interviews Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
