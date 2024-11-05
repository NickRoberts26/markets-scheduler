// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDzwcHKZGF_YhzoIsif0u_yXcjTEJOp0Zs",
    authDomain: "marketeer-75b47.firebaseapp.com",
    projectId: "marketeer-75b47",
    storageBucket: "marketeer-75b47.firebasestorage.app",
    messagingSenderId: "937089964935",
    appId: "1:937089964935:web:bf76d4bbea28de914d5122"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;