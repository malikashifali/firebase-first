// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvYbjo4ft_wZlutJ0bMyxlY3wyWp-Srqo",
  authDomain: "first-e-commerce-app-100.firebaseapp.com",
  projectId: "first-e-commerce-app-100",
  storageBucket: "first-e-commerce-app-100.appspot.com",
  messagingSenderId: "44622061826",
  appId: "1:44622061826:web:c95c35f5d5305ca74ea21b",
  measurementId: "G-HDNDP40F4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { analytics, auth, firestore, storage }