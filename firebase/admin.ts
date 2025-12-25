import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

function initFirebaseAdmin() {
  try {
    if (!process.env.FIREBASE_PROJECT_ID) throw new Error('Missing FIREBASE_PROJECT_ID');
    if (!process.env.FIREBASE_CLIENT_EMAIL) throw new Error('Missing FIREBASE_CLIENT_EMAIL');
    if (!process.env.FIREBASE_PRIVATE_KEY) throw new Error('Missing FIREBASE_PRIVATE_KEY');

    // Clean up the private key
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
      .replace(/\\n/g, '\n')  // Replace escaped newlines
      .replace(/^['"]|['"]$/g, ''); // Remove surrounding quotes if any

    if (!getApps().length) {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: privateKey,
        }),
      });
      console.log('Firebase Admin initialized successfully');
    }

    return {
      db: getFirestore(),
      auth: getAdminAuth()
    };
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    throw error; // Re-throw to prevent silent failures
  }
}

import { Firestore } from 'firebase-admin/firestore';
import { auth as adminAuth } from 'firebase-admin';

let db: Firestore | null = null;
let auth: adminAuth.Auth | null = null;

try {
  const admin = initFirebaseAdmin();
  db = admin.db;
  auth = admin.auth;
} catch (error) {
  console.error('Failed to initialize Firebase Admin. Please check your environment variables.');
  // Null values will be exported to prevent runtime errors
}

export { db, auth };