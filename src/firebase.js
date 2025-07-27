// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGcZQ0IMHyPWVgeAF83cenAFhcl9ImcNU",
  authDomain: "igdtuw-campus-tour.firebaseapp.com",
  projectId: "igdtuw-campus-tour",
  storageBucket: "igdtuw-campus-tour.appspot.com",
  messagingSenderId: "474619166591",
  appId: "1:474619166591:web:1fb264c31bcf3fdd62644a",
  measurementId: "G-11059P95YV"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Export them
export { auth, db };