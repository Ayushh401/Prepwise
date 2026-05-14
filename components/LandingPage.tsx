"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Mic,
  BarChart3,
  Clock,
  Shield,
  Zap,
  ChevronRight,
  ArrowRight,
  Star,
  Play,
  Users,
  Target,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const LandingPage = () => {
  const features = [
    {
      title: "AI-Powered Voice Interviews",
      description: "Practice with our intelligent AI interviewer that asks relevant questions based on your resume.",
      icon: <Mic className="w-6 h-6" />,
    },
    {
      title: "Instant Detailed Feedback",
      description: "Get comprehensive analysis with scores out of 10, strengths, and areas to improve.",
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      title: "Flexible Duration Options",
      description: "Choose from 15, 30, 45 minutes or 1 hour sessions that fit your schedule.",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: "Resume-Based Questions",
      description: "Questions tailored specifically to your experience, skills, and background.",
      icon: <Target className="w-6 h-6" />,
    },
    {
      title: "Real-Time Performance Tracking",
      description: "Monitor your progress over time with detailed interview history and scores.",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      title: "Private & Secure",
      description: "Your data stays private. Interviews are for your practice only.",
      icon: <Shield className="w-6 h-6" />,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      content: "Pracify helped me land my dream job. The AI interviewer felt so realistic.",
      avatar: "/avatar1.jpg",
    },
    {
      name: "Michael Rodriguez",
      role: "Product Manager at Meta",
      content: "Best tool for practicing behavioral questions. The feedback is incredibly detailed.",
      avatar: "/avatar2.jpg",
    },
    {
      name: "Emily Johnson",
      role: "Senior Developer at Amazon",
      content: "I practiced every day for 2 weeks. The instant feedback helped me improve fast.",
      avatar: "/avatar3.jpg",
    },
  ];

  const stats = [
    { value: "10K+", label: "Interviews Conducted" },
    { value: "95%", label: "User Satisfaction" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "24/7", label: "Available" },
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: ["Unlimited interviews", "Detailed feedback", "All durations", "Priority support"],
      highlight: false,
    },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="p-2 rounded-xl bg-primary-200/20">
                <Image src="/logo.svg" alt="Pracify Logo" width={28} height={24} />
              </div>
              <span className="text-xl font-bold text-primary-100">Pracify</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it Works</Link>
              <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
              <Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Reviews</Link>
            </nav>

            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" className="hidden sm:flex">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild className="btn-primary">
                <Link href="/sign-up">Get Started Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 flex flex-col items-center text-center px-4">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 -z-10 w-full max-w-4xl h-[500px] opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-200/40 to-transparent blur-[100px] rounded-full" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-200/10 border border-primary-200/20 mb-8">
          <Sparkles className="w-4 h-4 text-primary-100" />
          <span className="text-sm font-medium text-primary-100">AI-Powered Interview Practice</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl">
          Master Your Next Interview with AI Voice Practice
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Practice real interview questions with our AI interviewer. Get instant feedback, track your progress, and ace your next job interview with confidence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button asChild className="btn-primary px-8 h-12 text-lg gap-2">
            <Link href="/sign-up">
              Start Free Practice <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="btn-secondary px-8 h-12 text-lg gap-2">
            <Link href="#how-it-works">
              <Play className="w-5 h-5" /> Watch Demo
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-primary-100 uppercase tracking-wider">Features</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-4">
              Everything You Need to Ace Your Interview
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides a comprehensive interview preparation experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl border border-border bg-card hover:border-primary-200/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-200/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-primary-100">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-primary-100 uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-4">
              Start Practicing in 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-full bg-primary-200/10 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-primary-100">1</div>
              <h3 className="text-xl font-bold mb-2">Upload Your Resume</h3>
              <p className="text-muted-foreground">Add your resume so our AI can ask relevant questions about your experience.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-full bg-primary-200/10 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-primary-100">2</div>
              <h3 className="text-xl font-bold mb-2">Start Voice Interview</h3>
              <p className="text-muted-foreground">Choose duration and start a realistic voice interview with our AI interviewer.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-full bg-primary-200/10 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-primary-100">3</div>
              <h3 className="text-xl font-bold mb-2">Get Instant Feedback</h3>
              <p className="text-muted-foreground">Receive detailed scores and recommendations to improve your performance.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild className="btn-primary px-8 h-12 text-lg">
              <Link href="/sign-up">Try It Free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-primary-100 uppercase tracking-wider">Pricing</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free, upgrade when you need more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-2xl border ${
                  plan.highlight
                    ? "border-primary-200 bg-primary-200/5 relative"
                    : "border-border bg-card"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-200 text-dark-100 text-sm font-bold rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary-100" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`w-full ${plan.highlight ? "btn-primary" : "btn-secondary"}`}
                >
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-primary-100 uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-4">
              Loved by Job Seekers Everywhere
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="p-8 rounded-2xl border border-border bg-card">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary-200 text-primary-100" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-200/20 flex items-center justify-center text-primary-100 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto blue-gradient-dark rounded-[3rem] p-12 md:p-20 text-center border border-primary-200/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-200/5 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Ready to Nail Your Next Interview?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Join thousands of candidates who used Pracify to land offers at their dream companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary h-14 px-10 text-lg gap-2">
                <Link href="/sign-up">
                  Start Free <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="btn-secondary h-14 px-10 text-lg">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary-200/20">
              <Image src="/logo.svg" alt="Pracify" width={28} height={24} />
            </div>
            <span className="text-xl font-bold text-primary-100">Pracify</span>
          </div>

          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-foreground transition-colors">LinkedIn</Link>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pracify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;