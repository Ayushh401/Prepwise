"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "./FormField";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const idToken = await result.user.getIdToken();
      if (!idToken) {
        toast.error("Google sign in failed. Please try again.");
        return;
      }

      // Check if user exists by trying to sign in
      const signInResult = await signIn({ idToken });

      if (signInResult?.success) {
        toast.success("Signed in with Google successfully.");
        window.location.assign("/dashboard");
      } else {
        // User might not exist in DB, create them
        const signUpResult = await signUp({
          uid: result.user.uid,
          name: result.user.displayName || "User",
          email: result.user.email || "",
        });

        if (signUpResult.success) {
          const newSignInResult = await signIn({ idToken });
          if (newSignInResult?.success) {
            toast.success("Account created with Google successfully.");
            window.location.assign("/dashboard");
          } else {
            toast.success("Account created. Please sign in.");
            window.location.assign("/sign-in");
          }
        } else {
          // User already exists, try sign in again
          const retryResult = await signIn({ idToken });
          if (retryResult?.success) {
            toast.success("Signed in with Google successfully.");
            window.location.assign("/dashboard");
          } else {
            toast.error("Failed to sign in with Google. Please try again.");
          }
        }
      }
    } catch (error: any) {
      console.error("Google sign in error:", error);
      let errorMessage = "Failed to sign in with Google. Please try again.";

      if (error?.code) {
        switch (error.code) {
          case 'auth/popup-closed-by-user':
            errorMessage = "Sign in popup was closed. Please try again.";
            break;
          case 'auth/account-exists-with-different-credential':
            errorMessage = "An account already exists with a different sign in method. Please sign in with email and password.";
            break;
          case 'auth/cancelled-popup-request':
            // User cancelled, don't show error
            return;
          default:
            errorMessage = `Google sign in error: ${error.message || 'Unknown error'}`;
        }
      }

      toast.error(errorMessage);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        const { name, email, password } = data;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.success("Account created successfully. Please sign in.");
          router.push("/sign-in");
          return;
        }

        const signInResult = await signIn({ idToken });
        if (signInResult?.success) {
          toast.success("Account created and signed in successfully.");
          window.location.assign("/dashboard");
        } else {
          toast.error(signInResult?.message || "Account created, but sign in failed. Please sign in manually.");
          router.push("/sign-in");
        }
      } else {
        const { email, password } = data;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in Failed. Please try again.");
          return;
        }

        const result = await signIn({
          idToken,
        });

        if (result?.success) {
          toast.success("Signed in successfully.");
          window.location.assign("/dashboard");
        } else {
          const errorMessage = result?.message || "Failed to sign in. Please try again.";
          toast.error(errorMessage);
        }
      }
    } catch (error: any) {
      let errorMessage = "Failed to sign in. Please try again.";
      
      // Handle Firebase-specific errors by checking the error code
      if (error?.code) {
        switch (error.code) {
          case 'auth/invalid-credential':
            errorMessage = "Invalid email or password. Please check your credentials and try again.";
            break;
          case 'auth/user-not-found':
            errorMessage = "No account found with this email. Please sign up first.";
            break;
          case 'auth/wrong-password':
            errorMessage = "Incorrect password. Please try again.";
            break;
          case 'auth/invalid-email':
            errorMessage = "Invalid email address format.";
            break;
          case 'auth/too-many-requests':
            errorMessage = "Too many failed attempts. Please try again later.";
            break;
          case 'auth/user-disabled':
            errorMessage = "This account has been disabled. Please contact support.";
            break;
          case 'auth/email-already-in-use':
            errorMessage = "An account with this email already exists. Please sign in instead.";
            break;
          case 'auth/weak-password':
            errorMessage = "Password is too weak. Please choose a stronger password.";
            break;
          default:
            errorMessage = `Authentication error: ${error.message || 'Unknown error occurred'}`;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">Pracify</h2>
        </div>

        <h3>Practice job interviews with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-dark-100 px-2 text-light-400">Or continue with</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-3 py-6 border-border hover:bg-dark-300 hover:border-primary-200/50 transition-all"
          onClick={handleGoogleSignIn}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-light-100 font-medium">Continue with Google</span>
        </Button>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;