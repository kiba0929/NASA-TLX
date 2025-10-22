// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo0oTW8kng4qiKn4xbt7DbR1UgJQIGlSE",
  authDomain: "naelab-context-reply.firebaseapp.com",
  projectId: "naelab-context-reply",
  storageBucket: "naelab-context-reply.firebasestorage.app",
  messagingSenderId: "751567003176",
  appId: "1:751567003176:web:cc266fb51ada9ebacf5f1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
