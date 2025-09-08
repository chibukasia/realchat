// IMPORTANT:
// Create a .env.local file in the root of your project and add your
// Firebase project's configuration details there.
//
// .env.local
// NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
// NEXT_PUBLIC_FIREBASE_DATABASE_URL="your-database-url"
// NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
// NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
//

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
