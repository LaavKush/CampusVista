// // src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAGcZQ0IMHyPWVgeAF83cenAFhcl9ImcNU",
//   authDomain: "igdtuw-campus-tour.firebaseapp.com",
//   projectId: "igdtuw-campus-tour",
//   storageBucket: "igdtuw-campus-tour.appspot.com",
//   messagingSenderId: "474619166591",
//   appId: "1:474619166591:web:1fb264c31bcf3fdd62644a",
//   measurementId: "G-11059P95YV",
//   databaseURL: "https://igdtuw-campus-tour-default-rtdb.firebaseio.com/"
// };

// // Initialize Firebase app
// const app = initializeApp(firebaseConfig);

// // Initialize services
// const auth = getAuth(app);
// const db = getFirestore(app);

// // Export them
// export { auth, db };

// src/firebase.js
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Firebase config (no Realtime Database URL needed)
const firebaseConfig = {
  apiKey: "AIzaSyAGcZQ0IMHyPWVgeAF83cenAFhcl9ImcNU",
  authDomain: "igdtuw-campus-tour.firebaseapp.com",
  projectId: "igdtuw-campus-tour",
  storageBucket: "igdtuw-campus-tour.appspot.com",
  messagingSenderId: "474619166591",
  appId: "1:474619166591:web:1fb264c31bcf3fdd62644a",
  measurementId: "G-11059P95YV"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export them for use in your app
export { app, auth, db };
