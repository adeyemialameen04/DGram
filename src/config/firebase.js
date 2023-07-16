// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYbX1ryBUWqUXbS6HpfntBdJbXc6ruxy0",
  authDomain: "dgram-54acc.firebaseapp.com",
  projectId: "dgram-54acc",
  storageBucket: "dgram-54acc.appspot.com",
  messagingSenderId: "659007650292",
  appId: "1:659007650292:web:f470a0e6dddb7995e321a1",
  measurementId: "G-JNXWRVKHH0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();