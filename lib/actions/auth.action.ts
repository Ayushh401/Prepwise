"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

// Set session cookie
export async function setSessionCookie(idToken: string) {
  try {
    console.log('Setting session cookie...');
    const cookieStore = await cookies();

    if (!idToken) {
      throw new Error('No ID token provided');
    }
    
    if (!auth) {
      throw new Error('Firebase Admin auth is not initialized. Check your Firebase Admin configuration.');
    }

    // Create session cookie
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_DURATION * 1000, // milliseconds
    });

    if (!sessionCookie) {
      throw new Error('Failed to create session cookie: No session cookie returned');
    }

    console.log('Session cookie created, setting in browser...');
    // Set cookie in the browser
    cookieStore.set("session", sessionCookie, {
      maxAge: SESSION_DURATION,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });
    
    console.log('Session cookie set successfully');
  } catch (error) {
    console.error('Error in setSessionCookie:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: (error as any)?.code,
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error; // Re-throw to be handled by the caller
  }
}

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    if (!db) {
      throw new Error('Database connection not initialized');
    }
    
    // check if user exists in db
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists)
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };

    // save user to db
    await db.collection("users").doc(uid).set({
      name,
      email,
      // profileURL,
      // resumeURL,
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error: any) {
    console.error("Error creating user in Firestore:", error);

    // Handle Firebase specific errors
    if (error.code === "auth/email-already-exists") {

      return {
        success: false,
        message: "This email is already in use",
      };
    }

    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;
  
  console.log('🔑 Starting sign in process for email:', email);

  try {
    if (!auth) {
      console.error('❌ Firebase Admin auth is not initialized');
      throw new Error('Authentication service is not available');
    }

    console.log('🔍 Attempting to get user by email...');
    const userRecord = await auth.getUserByEmail(email).catch(error => {
      console.error('❌ Error getting user by email:', error);
      throw error;
    });
    
    if (!userRecord) {
      console.log('❌ No user found with email:', email);
      return {
        success: false,
        message: "User does not exist. Create an account.",
      };
    }

    console.log('✅ User found, setting session cookie...');
    await setSessionCookie(idToken).catch(error => {
      console.error('❌ Error setting session cookie:', error);
      throw error;
    });
    
    console.log('✅ Session cookie set successfully');
    
    return {
      success: true,
      message: "Successfully signed in.",
    };
  } catch (error: any) {
    console.error('❌ Sign in error details:', {
      message: error.message,
      code: error.code,
      name: error.name,
      stack: error.stack
    });
    
    let errorMessage = "Failed to log into account. Please try again.";
    
    // Handle specific Firebase Auth errors
    if (error.code) {
      console.log('ℹ️ Error code:', error.code);
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = "No user found with this email. Please sign up first.";
          break;
        case 'auth/wrong-password':
          errorMessage = "Incorrect password. Please try again.";
          break;
        case 'auth/too-many-requests':
          errorMessage = "Too many failed attempts. Please try again later.";
          break;
        case 'auth/invalid-email':
          errorMessage = "Invalid email address format.";
          break;
        case 'auth/invalid-credential':
          errorMessage = "Invalid credentials. Please check your email and password.";
          break;
        default:
          errorMessage = `Authentication error: ${error.message || 'Unknown error occurred'}`;
      }
    }
    
    console.error('❌ Final error to user:', errorMessage);
    
    return {
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    };
  }
}

// Sign out user by clearing the session cookie
export async function signOut() {
  const cookieStore = await cookies();

  cookieStore.delete("session");
}

// Get current user from session cookie
export async function getCurrentUser(): Promise<User | null> {
  if (!auth) {
    console.error('Firebase Admin auth is not initialized');
    return null;
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    if (!db) {
      console.error('Database connection not initialized');
      return null;
    }

    // get user info from db
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);

    // Invalid or expired session
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

// Update user profile
export async function updateUserProfile(params: {
  userId: string;
  name?: string;
  resume?: string;
  bio?: string;
}) {
  const { userId, name, resume, bio } = params;

  try {
    if (!db) throw new Error("Database connection not initialized");

    const updateData: any = {};
    if (name) updateData.name = name;
    if (resume) updateData.resume = resume;
    if (bio) updateData.bio = bio;

    await db.collection("users").doc(userId).update(updateData);

    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { success: false, message: "Failed to update profile" };
  }
}

