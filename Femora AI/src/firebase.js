import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBaCVgLBFiiXQ40lSOL7Z6IWJdV-Q1dTEs",
  authDomain: "femora-ai.firebaseapp.com",
  projectId: "femora-ai",
  storageBucket: "femora-ai.firebasestorage.app",
  messagingSenderId: "292568048189",
  appId: "G-WJ0M4HBM7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
