// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-final-86472.firebaseapp.com",
  projectId: "mern-final-86472",
  storageBucket: "mern-final-86472.appspot.com",
  messagingSenderId: "903282676469",
  appId: "1:903282676469:web:98249c317312b6c2906bbc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);