// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pathanestate-d1643.firebaseapp.com",
  projectId: "pathanestate-d1643",
  storageBucket: "pathanestate-d1643.appspot.com",
  messagingSenderId: "254997970762",
  appId: "1:254997970762:web:df4912159f9509e53b4bb3",
  measurementId: "G-6C54Q9XWE0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
