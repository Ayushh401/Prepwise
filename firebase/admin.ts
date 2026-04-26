import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

function initFirebaseAdmin() {
  try {
    if (!process.env.FIREBASE_PROJECT_ID) throw new Error('Missing FIREBASE_PROJECT_ID');
    if (!process.env.FIREBASE_CLIENT_EMAIL) throw new Error('Missing FIREBASE_CLIENT_EMAIL');
    if (!process.env.FIREBASE_PRIVATE_KEY) throw new Error('Missing FIREBASE_PRIVATE_KEY');

    // Clean up the private key
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    
    // 1. Remove surrounding quotes if they exist
    privateKey = privateKey.replace(/^['"]|['"]$/g, '');
    
    // 2. Handle escaped newlines (different loaders handle this differently)
    if (privateKey.includes('\\n')) {
      privateKey = privateKey.replace(/\\n/g, '\n');
    }

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