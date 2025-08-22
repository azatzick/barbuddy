// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Replace the placeholders below with your actual config
const firebaseConfig = {
    apiKey: "AIzaSyCfl7Exc7onQFa3wa9esZX_DZSRAN-N7zs",
    authDomain: "barbuddy-4066c.firebaseapp.com",
    projectId: "barbuddy-4066c",
    storageBucket: "barbuddy-4066c.firebasestorage.app",
    messagingSenderId: "321048764198",
    appId: "1:321048764198:web:ede5e38d7ce0dee1cc2be7",
    measurementId: "G-PM2Q98V7Z3"
  };

// Initialize Firebase and get the auth service
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };