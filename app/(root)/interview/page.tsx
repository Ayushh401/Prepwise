import { redirect } from "next/navigation";
import Agent from "@/components/Agent";
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

      <Agent
        userName={user.name}
        userId={user.id}
        resumeContent={user.resumeContent}
        role={role}
        type="generate"
      />


    </>
  );
};

export default Page;

