interface Feedback {
  id: string;
  interviewId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}

interface Interview {
  id: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
}

interface CreateFeedbackParams {
  interviewId: string;
  userId: string;
  transcript: { role: string; content: string }[];
  feedbackId?: string;
}

interface User {
  name: string;
  email: string;
  id: string;
  resume?: string;
  resumeFileName?: string;
  resumeContent?: string;
  resumeParsed?: ResumeParsed;
  bio?: string;
}

interface ResumeParsed {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  education?: string[];
  skills?: string[];
  experience?: string[];
  linkedin?: string;
  github?: string;
  website?: string;
}




interface InterviewCardProps {
  interviewId?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
}

interface AgentProps {
  userName: string;
  userId?: string;
  interviewId?: string;
  feedbackId?: string;
  resumeContent?: string;
  role?: string;
  type: "generate" | "interview";
  questions?: string[];
  duration?: number;
  persona?: {
    id: string;
    name: string;
    title: string;
    style: string;
    avatar: string;
    description: string;
  } | null;
  language?: string;
  additionalContext?: string;
}



interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface GetFeedbackByInterviewIdParams {
  interviewId: string;
  userId: string;
}

interface GetLatestInterviewsParams {
  userId: string;
  limit?: number;
}

interface SignInParams {
  email?: string;
  idToken: string;
}

interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  password?: string;
}

type FormType = "sign-in" | "sign-up";

interface InterviewFormProps {
  interviewId: string;
  role: string;
  level: string;
  type: string;
  techstack: string[];
  amount: number;
}

interface TechIconProps {
  techStack: string[];
}
