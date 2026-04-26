"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Cpu, 
  MessageSquare, 
  Sparkles, 
  Briefcase, 
  Target, 
  TrendingUp,
  ChevronRight,
  ArrowRight,
  Star
} from "lucide-react";

const LandingPage = () => {
  const useCases = [
    {
      title: "Technical Mock Interviews",
      description: "Practice coding and system design with an AI that understands deeply technical concepts.",
      icon: <Cpu className="w-6 h-6 text-primary-200" />,
    },
    {
      title: "Behavioral Prep",
      description: "Master STAR method questions with real-time feedback on your tone and content.",
      icon: <MessageSquare className="w-6 h-6 text-primary-200" />,
    },
    {
      title: "Role-Specific Coaching",
      description: "Customized tracks for Software Engineers, Product Managers, Data Scientists, and more.",
      icon: <Briefcase className="w-6 h-6 text-primary-200" />,
    },
    {
      title: "Personalized Roadmap",
      description: "AI-generated study plans based on your target company and skills gap.",
      icon: <TrendingUp className="w-6 h-6 text-primary-200" />,
    },
  ];

  const features = [
    "Unlimited real-time practice sessions",
    "Instant feedback on every answer",
    "Company-specific question banks",
    "Performance tracking and insights",
    "Available 24/7 across all devices",
  ];

  const companyLogos = [
    "adobe", "amazon", "facebook", "hostinger", "pinterest", "reddit", "skype", "spotify", "telegram", "tiktok", "yahoo", "quora"
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 flex flex-col items-center text-center px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-7xl h-[600px] opacity-20 pointer-events-none">
           <div className="absolute inset-0 bg-gradient-to-b from-primary-200/30 to-transparent blur-3xl rounded-full" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-200 border border-border mb-8 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-primary-200" />
          <span className="text-xs font-medium text-primary-100">AI-Powered Interview Excellence</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl bg-gradient-to-r from-white to-primary-100 bg-clip-text text-transparent leading-tight">
          Master Your Next <br /> Tech Interview with AI
        </h1>
        
        <p className="text-xl text-light-100 mb-10 max-w-2xl mx-auto">
          PrepWise gives you the edge with real-time mock interviews, instant feedback, and personalized coaching to land your dream job at top tech companies.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button asChild className="btn-primary px-8 h-12 text-lg">
            <Link href="/sign-up">Start Practicing Free</Link>
          </Button>
          <Button asChild variant="outline" className="btn-secondary px-8 h-12 text-lg border-primary-200/20">
            <Link href="#use-cases">Explore Use Cases</Link>
          </Button>
        </div>

        <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
          <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
          <Image 
            src="/robot.png" 
            alt="AI Interviewer Interface" 
            width={1200} 
            height={600} 
            className="w-full h-auto object-cover opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-dark-100/80 backdrop-blur-md p-6 rounded-2xl border border-primary-200/20 max-w-md animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center">
                        <Cpu className="text-dark-100 w-6 h-6" />
                    </div>
                    <div className="text-left font-bold text-lg">PrepWise AI</div>
                </div>
                <p className="text-left text-sm text-light-100 italic">"Great answer! You explained the time complexity well, but could you elaborate on the space complexity for the recursive approach?"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-dark-100/50 backdrop-blur-sm border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm font-medium text-light-400 uppercase tracking-widest mb-10">
            Prepare for Interviews at Industry Leaders
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {companyLogos.slice(0, 6).map((logo) => (
              <Image 
                key={logo} 
                src={`/covers/${logo}.png`} 
                alt={logo} 
                width={120} 
                height={40} 
                className="h-8 w-auto object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-32 max-w-7xl mx-auto px-4 w-full">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for Every Career Stage</h2>
          <p className="text-lg text-light-100 max-w-2xl">
            Whether you're a new grad or a senior leader, PrepWise adapts to your experience level and target role.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, idx) => (
            <div key={idx} className="p-8 rounded-3xl dark-gradient border border-border hover:border-primary-200/30 transition-all group flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-200/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                {useCase.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{useCase.title}</h3>
              <p className="text-light-100 text-sm leading-relaxed">{useCase.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-dark-200/30 border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary-200/10 blur-[100px] rounded-full animate-pulse" />
             <div className="z-10 relative space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold">Why Top Candidates Choose PrepWise</h2>
                <ul className="space-y-4">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-light-100">
                            <div className="shrink-0 w-6 h-6 rounded-full bg-success-100/20 flex items-center justify-center">
                                <CheckCircle2 className="w-4 h-4 text-success-100" />
                            </div>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
                <Button asChild className="btn-primary group">
                    <Link href="/sign-up">
                        Get Started Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
             </div>
          </div>
          
          <div className="relative flex justify-center">
              <div className="relative w-[300px] h-[580px] bg-dark-100 rounded-[40px] border-[10px] border-dark-300 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 blue-gradient-dark p-6 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-1.5 bg-border rounded-full" />
                        <div className="flex gap-2">
                            <div className="w-1.5 h-1.5 bg-border rounded-full" />
                            <div className="w-1.5 h-1.5 bg-border rounded-full" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="text-xs font-bold text-primary-200 uppercase tracking-widest">Ongoing Session</div>
                        <h4 className="text-xl font-bold">Data Structures & Algos</h4>
                        <div className="p-4 rounded-xl dark-gradient border border-border space-y-2">
                             <div className="text-xs text-light-400">Question:</div>
                             <div className="text-sm font-medium">Explain the difference between a Hash Table and a Binary Search Tree...</div>
                        </div>
                        <div className="p-4 rounded-xl bg-primary-200/10 border border-primary-200/20 space-y-2">
                             <div className="text-xs text-primary-200">AI Feedback:</div>
                             <div className="text-sm">You've correctly identified the lookup time. Try focusing on the worst-case scenarios for both.</div>
                        </div>
                    </div>
                    <div className="mt-auto h-2 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-primary-200 w-2/3 rounded-full" />
                    </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute top-20 -right-4 bg-dark-300 border border-border p-3 rounded-2xl shadow-xl animate-fadeIn">
                 <div className="flex items-center gap-2">
                    <div className="p-1 bg-yellow-500/20 rounded-lg">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    </div>
                    <div className="text-xs font-bold">1,200+ Practice Qs</div>
                 </div>
              </div>
              <div className="absolute bottom-40 -left-10 bg-dark-300 border border-border p-3 rounded-2xl shadow-xl animate-fadeIn">
                 <div className="flex items-center gap-2">
                    <div className="p-1 bg-blue-500/20 rounded-lg">
                        <Target className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="text-xs font-bold">FAANG Optimized</div>
                 </div>
              </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 w-full relative">
        <div className="max-w-4xl mx-auto blue-gradient-dark rounded-[3rem] p-12 md:p-20 text-center border border-primary-200/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary-200/5 pointer-events-none" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">Ready to build your career?</h2>
            <p className="text-xl text-light-100 mb-10 max-w-xl mx-auto relative z-10">
                Join thousands of candidates who used PrepWise to land offers at their dream companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <Button asChild className="btn-primary h-14 px-10 text-lg">
                    <Link href="/sign-up">Get Full Access</Link>
                </Button>
                <Button asChild className="btn-secondary h-14 px-10 text-lg">
                    <Link href="/sign-in">Login to Dashboard</Link>
                </Button>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
                <Image src="/logo.svg" alt="PrepWise" width={32} height={32} />
                <span className="text-2xl font-bold text-primary-100">PrepWise</span>
            </div>
            
            <div className="flex gap-8 text-sm text-light-400">
                <Link href="#" className="hover:text-primary-100 transition-colors">Privacy</Link>
                <Link href="#" className="hover:text-primary-100 transition-colors">Terms</Link>
                <Link href="#" className="hover:text-primary-100 transition-colors">Twitter</Link>
                <Link href="#" className="hover:text-primary-100 transition-colors">LinkedIn</Link>
            </div>
            
            <p className="text-sm text-light-400 font-mono">
                © {new Date().getFullYear()} PrepWise. Made for the next generation of builders.
            </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
