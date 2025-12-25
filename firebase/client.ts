// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps} from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv0j_crdJxJ3J3ycCHYtp2lFQDEx2zeoQ",
  authDomain: "prewpwise.firebaseapp.com",
  projectId: "prewpwise",
  storageBucket: "prewpwise.firebasestorage.app",
  messagingSenderId: "620497868512",
  appId: "1:620497868512:web:c709cc98b9fec0a48be285",
  measurementId: "G-GL7W1X9RY3"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig): getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);