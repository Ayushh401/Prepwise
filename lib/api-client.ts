
/**
 * API Client for Pracify
 * Maps the Backend API routes to the Frontend
 */

export const apiClient = {
  // Authentication
  auth: {
    getCurrentUser: async () => {
      const res = await fetch("/api/auth/current");
      return res.json();
    },
  },

  // Resume
  resume: {
    scan: async (formData: FormData) => {
      const res = await fetch("/api/resume/scan", {
        method: "POST",
        body: formData,
      });
      return res.json();
    },
  },

  // Interviews
  interviews: {
    getPersonal: async () => {
      const res = await fetch("/api/interviews?type=personal");
      return res.json();
    },
    getLatest: async (limit = 10) => {
      const res = await fetch(`/api/interviews?type=latest&limit=${limit}`);
      return res.json();
    },
  },

  // Feedback
  feedback: {
    getById: async (interviewId: string) => {
      const res = await fetch(`/api/feedback/${interviewId}`);
      return res.json();
    },
  },
};
