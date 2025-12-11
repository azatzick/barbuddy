// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


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
const app = initializeApp(firebaseConfig);

// Initialize Firebase and get the auth service
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };