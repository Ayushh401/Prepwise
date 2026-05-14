import Link from "next/link";
import { redirect } from "next/navigation";
import InterviewSetup from "@/components/InterviewSetup";
import ResumeDetails from "@/components/ResumeDetails";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async ({ searchParams }: RouteParams) => {
  const { role } = await searchParams;
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-8 bg-primary-200 rounded-full" />
        <h3 className="text-2xl font-bold">{role ? `${role} Interview` : "Custom Interview"}</h3>
      </div>

      <InterviewSetup user={user} role={role} />

      <div className="mt-12 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h4 className="text-lg font-semibold text-light-100">Your resume (sent to the interviewer)</h4>
          <Link
            href="/dashboard"
            className="text-sm text-primary-200 hover:underline w-fit"
          >
            Update resume on Dashboard
          </Link>
        </div>
        <ResumeDetails user={user} />
      </div>
    </>
  );
};

export default Page;

