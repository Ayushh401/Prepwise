import Link from "next/link";
import Image from "next/image";
import { 
  Code2, 
  Database, 
  Layers, 
  Smartphone, 
  BrainCircuit, 
  Settings,
  Plus,
  History,
  Target,
  FileText
} from "lucide-react";


import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import LandingPage from "@/components/LandingPage";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

const roleTracks = [
  {
    title: "Resume-Based Track",
    description: "Scan your resume and get tailored questions",
    icon: <FileText className="w-6 h-6 text-primary-200-100" />,
    color: "from-blue-600/20 to-transparent",
  },
  {
    title: "Frontend Developer",
    description: "React, Next.js, UI/UX, & Performance",
    icon: <Code2 className="w-6 h-6 text-primary-200-100" />,
    color: "from-blue-500/20 to-transparent",
  },

  {
    title: "Backend Developer",
    description: "Node.js, Databases, APIs & Scalability",
    icon: <Database className="w-6 h-6 text-primary-200-100" />,
    color: "from-purple-500/20 to-transparent",
  },
  {
    title: "Fullstack Developer",
    description: "End-to-end development & System Design",
    icon: <Layers className="w-6 h-6 text-primary-200-100" />,
    color: "from-green-500/20 to-transparent",
  },
  {
    title: "Mobile Developer",
    description: "iOS, Android, React Native & Flutter",
    icon: <Smartphone className="w-6 h-6 text-primary-200-100" />,
    color: "from-orange-500/20 to-transparent",
  },
  {
    title: "AI / ML Engineer",
    description: "LLMs, Data Models & Neural Networks",
    icon: <BrainCircuit className="w-6 h-6 text-primary-200-100" />,
    color: "from-pink-500/20 to-transparent",
  },
  {
    title: "DevOps Engineer",
    description: "Cloud, CI/CD, Docker & Kubernetes",
    icon: <Settings className="w-6 h-6 text-primary-200-100" />,
    color: "from-cyan-500/20 to-transparent",
  },
];

async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    return <LandingPage />;
  }

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = (userInterviews && userInterviews.length > 0) || false;
  const hasUpcomingInterviews = (allInterview && allInterview.length > 0) || false;

  return (
    <div className="root-layout !my-0 !py-12">
      {/* Welcome Banner */}
      <section className="relative overflow-hidden blue-gradient-dark rounded-[2.5rem] p-10 md:p-16 mb-16 border border-primary/10">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-primary-200 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col gap-6 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary-200/20 w-fit">
               <Target className="w-4 h-4 text-primary-200-100" />
               <span className="text-xs font-bold text-primary-200-100 uppercase tracking-wider">Welcome back, {user.name}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Ready to crush your next interview?
            </h1>
            <p className="text-lg text-light-100">
               Choose a specialized track or start a custom interview to get personalized AI feedback.
            </p>

            <Button asChild className="btn-primary h-14 px-8 text-lg w-full sm:w-fit shadow-lg shadow-primary-200/20">
              <Link href="/interview" className="flex items-center gap-2">
                <Plus className="w-5 h-5" /> Start New Interview
              </Link>
            </Button>
          </div>

          <div className="relative shrink-0 hidden lg:block">
            <div className="absolute inset-0 bg-primary-200/20 blur-2xl rounded-full scale-75 animate-pulse" />
            <Image
              src="/robot.png"
              alt="Interviewer Bot"
              width={350}
              height={350}
              className="relative z-10 drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Role Selection Track */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 bg-primary-200 rounded-full" />
            <h2 className="text-3xl font-bold">Select Your Track</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roleTracks.map((track, i) => (
            <Link key={i} href={`/interview?role=${encodeURIComponent(track.title)}`} className="group">
              <div className={`relative h-full dark-gradient rounded-3xl p-8 border border-border group-hover:border-primary-200/50 transition-all duration-300 overflow-hidden`}>

                <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative z-10 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-dark-300 flex items-center justify-center border border-border group-hover:scale-110 transition-transform duration-300">
                        {track.icon}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary-200-100 transition-colors">{track.title}</h3>
                        <p className="text-sm text-light-400 group-hover:text-light-100 transition-colors">{track.description}</p>
                    </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Your History */}
        <section className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <History className="w-6 h-6 text-primary-200-100" />
                    <h2 className="text-2xl font-bold">Your History</h2>
                </div>
                {hasPastInterviews && (
                    <Link href="#" className="text-sm text-primary-200-100 hover:underline">View all</Link>
                )}
            </div>

            <div className="space-y-4">
              {hasPastInterviews ? (
                userInterviews?.slice(0, 3).map((interview) => (
                  <InterviewCard
                    key={interview.id}
                    userId={user?.id}
                    interviewId={interview.id}
                    role={interview.role}
                    type={interview.type}
                    techstack={interview.techstack}
                    createdAt={interview.createdAt}
                  />
                ))
              ) : (
                <div className="dark-gradient rounded-3xl p-10 border border-dashed border-border text-center flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-dark-200 flex items-center justify-center opacity-50">
                         <History className="w-6 h-6" />
                    </div>
                    <p className="text-light-400">You haven&apos;t taken any interviews yet. <br /> Start your first one today!</p>
                </div>
              )}
            </div>
        </section>

        {/* Global Exploration / Templates */}
        <section className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Plus className="w-6 h-6 text-primary-200-100" />
                    <h2 className="text-2xl font-bold">Community Templates</h2>
                </div>
            </div>

            <div className="space-y-4">
              {hasUpcomingInterviews ? (
                allInterview?.slice(0, 3).map((interview) => (
                  <InterviewCard
                    key={interview.id}
                    userId={user?.id}
                    interviewId={interview.id}
                    role={interview.role}
                    type={interview.type}
                    techstack={interview.techstack}
                    createdAt={interview.createdAt}
                  />
                ))
              ) : (
                <div className="dark-gradient rounded-3xl p-10 border border-dashed border-border text-center flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-dark-200 flex items-center justify-center opacity-50">
                         <Target className="w-6 h-6" />
                    </div>
                    <p className="text-light-400">Explore community templates soon.</p>
                </div>
              )}
            </div>
        </section>
      </div>
    </div>
  );
}

export default Home;


