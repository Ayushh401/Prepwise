import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getAuth as getAdminAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import process from 'process';

function initFirebaseAdmin() {
  try {
    if (!process.env.FIREBASE_PROJECT_ID) throw new Error('Missing FIREBASE_PROJECT_ID');
    if (!process.env.FIREBASE_CLIENT_EMAIL) throw new Error('Missing FIREBASE_CLIENT_EMAIL');
    if (!process.env.FIREBASE_PRIVATE_KEY) throw new Error('Missing FIREBASE_PRIVATE_KEY');

    let privateKey = process.env.FIREBASE_PRIVATE_KEY!;
    // Handle escaped newlines and quotes (standard fix for Vercel/environment variables)
    privateKey = privateKey.replace(/^['"]|['"]$/g, '').replace(/\\n/g, '\n');

    if (!getApps().length) {
      console.log('--- Firebase Admin Debug ---');
      console.log('Project ID:', process.env.FIREBASE_PROJECT_ID);
      console.log('Client Email:', process.env.FIREBASE_CLIENT_EMAIL);
      console.log('Private Key length:', privateKey.length);
      console.log('Private Key starts with:', privateKey.substring(0, 30));
      console.log('---------------------------');

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

let db: Firestore | null = null;
let auth: Auth | null = null;

try {
  const admin = initFirebaseAdmin();
  db = admin.db;
  auth = admin.auth;
} catch (error) {
  console.error('Failed to initialize Firebase Admin. Please check your environment variables.');
}

export { db, auth };