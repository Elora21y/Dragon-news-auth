// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpov4L7X-f0VB5a5HRA5oIRoPgdSmVBmo",
  authDomain: "dragon-news-auth-a7c15.firebaseapp.com",
  projectId: "dragon-news-auth-a7c15",
  storageBucket: "dragon-news-auth-a7c15.firebasestorage.app",
  messagingSenderId: "125125346693",
  appId: "1:125125346693:web:06e9670d36f886022f70ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);