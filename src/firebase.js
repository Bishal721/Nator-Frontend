// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "natours-b00ba.firebaseapp.com",
  projectId: "natours-b00ba",
  storageBucket: "natours-b00ba.appspot.com",
  messagingSenderId: "950109735374",
  appId: "1:950109735374:web:4a3bd29cb876db494dc39f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);