// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
// AuthContext.jsx
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper: shallow compare relevant user fields to avoid unnecessary updates
  const isSameUser = (userA, userB) => {
    if (!userA && !userB) return true;
    if (!userA || !userB) return false;
    return (
      userA.uid === userB.uid &&
      userA.email === userB.email &&
      userA.displayName === userB.displayName &&
      userA.photoURL === userB.photoURL
    );
  };

// Google Sign-In method
const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if email ends with @igdtuw.ac.in
    if (!user.email.endsWith("@igdtuw.ac.in")) {
      alert("Only IGDTUW email addresses are allowed.");
      await signOut(auth);
      return;
    }

    console.log("User signed in:", user);
  } catch (err) {
    console.error("Google Sign-In Error:", err.message);
  }
};


  // Logout method
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed. Current user: ", currentUser);

      // Only update user state if data changed
      setUser((prevUser) => {
        if (isSameUser(prevUser, currentUser)) {
          return prevUser; // No change, avoid re-render
        }
        return currentUser; // Updated user info
      });

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
