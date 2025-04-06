// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getAuth} from 'firebase/auth';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAw-z9vSNcyqwbYVojKTJw3uD9yuRnzrsA",
  authDomain: "wys1-6b630.firebaseapp.com",
  projectId: "wys1-6b630",
  storageBucket: "wys1-6b630.firebasestorage.app",
  messagingSenderId: "710042159613",
  appId: "1:710042159613:web:e2388853fd008b19f6f194",
  measurementId: "G-KV59G0RCTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);
export default app;