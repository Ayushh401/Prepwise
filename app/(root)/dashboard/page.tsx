import Link from "next/link";
import { redirect } from "next/navigation";
import { 
  User, 
  Mail, 
  FileText, 
  Trophy, 
  Calendar,
  Settings,
  ArrowLeft,
  Briefcase,
  CheckCircle2
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId } from "@/lib/actions/general.action";
import ProfileForm from "@/components/ProfileForm";
import ResumeUpload from "@/components/ResumeUpload";
import ResumeDetails from "@/components/ResumeDetails";


const DashboardPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const interviews = await getInterviewsByUserId(user.id);
  const totalInterviews = interviews?.length || 0;

  return (
    <div className="root-layout !my-0 !py-12">
      <div className="flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 text-sm text-light-100 hover:text-primary-200 transition-colors mb-2 w-fit">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-4xl font-bold">Your Profile</h1>
            <p className="text-light-100">Manage your account and track your progress</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl dark-gradient border border-border flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-200/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary-200" />
              </div>
              <div>
                <p className="text-xs text-light-400 uppercase font-bold tracking-wider">Interviews</p>
                <p className="text-2xl font-bold">{totalInterviews}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card-border w-full">
              <div className="card !p-8 flex flex-col items-center text-center gap-6">
                <div className="relative group">
                    <div className="w-32 h-32 rounded-full blue-gradient-dark border-4 border-primary-200/20 flex items-center justify-center overflow-hidden">
                        <User className="w-16 h-16 text-primary-200 opacity-50" />
                    </div>
                </div>
                
                <div>
                    <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                    <p className="text-light-400 flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" /> {user.email}
                    </p>
                </div>

                <div className="w-full h-px bg-border my-2" />

                <div className="w-full space-y-4 text-left">
                    <ResumeUpload userId={user.id} currentResumeName={user.resumeFileName} />
                    
                    <div className="flex items-center justify-between p-3 rounded-xl bg-dark-300 border border-border/50">

                        <div className="flex items-center gap-3">
                            <Briefcase className="w-5 h-5 text-primary-200" />
                            <span className="text-sm font-medium">Active Path</span>
                        </div>
                        <span className="text-xs bg-success-100/10 text-success-100 px-2 py-1 rounded-md font-bold">Standard</span>
                    </div>
                </div>
              </div>
            </div>

            <div className="blue-gradient-dark rounded-3xl p-8 border border-primary-200/20">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary-200" /> Goal Checklist
                </h3>
                <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full border-2 border-primary-200 flex-shrink-0" />
                        <span>Complete focus track</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full border-2 border-primary-200 flex-shrink-0" />
                        <span>Improve system design score</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full border-2 border-primary-200 flex-shrink-0" />
                        <span>Mock interview with Peer</span>
                    </li>
                </ul>
            </div>
          </div>

          {/* Right Column: Edit Profile & Activity */}
          <div className="lg:col-span-2 space-y-8">
            <div className="dark-gradient rounded-[2rem] p-8 md:p-10 border border-border">
                <div className="flex items-center gap-3 mb-8">
                    <Settings className="w-6 h-6 text-primary-200" />
                    <h2 className="text-2xl font-bold">Edit Profile Details</h2>
                </div>
                
                <ProfileForm user={user} />
            </div>

            <ResumeDetails user={user} />

            <div className="space-y-6">
               <div className="flex items-center gap-3 text-xl font-bold px-2">
                   <Calendar className="w-6 h-6 text-primary-200" />
                   Recent Activity
               </div>
               
               <div className="space-y-4">
                  {interviews && interviews.length > 0 ? (
                    interviews.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-dark-200/50 border border-border/50 hover:border-primary-200/30 transition-all group">
                           <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-xl bg-dark-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                                   <Briefcase className="w-5 h-5" />
                               </div>
                               <div>
                                   <p className="font-bold">{item.role} Practice</p>
                                   <p className="text-xs text-light-400">{new Date(item.createdAt).toLocaleDateString()}</p>
                               </div>
                           </div>
                           <Button asChild variant="ghost" className="text-primary-200">
                               <Link href={`/interview/${item.id}`}>View Result</Link>
                           </Button>
                        </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-light-400 border border-dashed border-border rounded-2xl italic">
                        No recent activity recorded.
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
