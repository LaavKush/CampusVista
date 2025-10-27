// // src/context/AuthContext.jsx
// import React, { createContext, useContext, useEffect, useState } from "react";
// // AuthContext.jsx
// import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword,GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { initializeApp } from "firebase/app";

// import { auth } from "../firebase";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Helper: shallow compare relevant user fields to avoid unnecessary updates
//   const isSameUser = (userA, userB) => {
//     if (!userA && !userB) return true;
//     if (!userA || !userB) return false;
//     return (
//       userA.uid === userB.uid &&
//       userA.email === userB.email &&
//       userA.displayName === userB.displayName &&
//       userA.photoURL === userB.photoURL
//     );
//   };

// // Google Sign-In method
// const googleSignIn = async () => {
//   const provider = new GoogleAuthProvider();
//   try {
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;

//     // Check if email ends with @igdtuw.ac.in
//     if (!user.email.endsWith("@igdtuw.ac.in")) {
//       alert("Only IGDTUW email addresses are allowed.");
//       await signOut(auth);
//       return;
//     }

//     console.log("User signed in:", user);
//   } catch (err) {
//     console.error("Google Sign-In Error:", err.message);
//   }
// };


//   // Logout method
//   const logout = async () => {
//     try {
//       await signOut(auth);
//     } catch (err) {
//       console.error("Logout error:", err.message);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       console.log("Auth state changed. Current user: ", currentUser);

//       // Only update user state if data changed
//       setUser((prevUser) => {
//         if (isSameUser(prevUser, currentUser)) {
//           return prevUser; // No change, avoid re-render
//         }
//         return currentUser; // Updated user info
//       });

//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, googleSignIn, logout }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Helper to safely compare user objects
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

  // 🌐 Google Sign-In method
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const signedInUser = result.user;
      const email = signedInUser.email?.toLowerCase() || "";

      // ✅ Role-based redirection logic
      if (email.endsWith("@igdtuw.ac.in")) {
        setRole("student");
        console.log("🎓 Student user detected:", email);
        window.location.href = "/student-dashboard";
      } else if (
        email === "tiwarijishop@gmail.com" ||
        email === "nescafe.igdtuw@gmail.com"
      ) {
        setRole("admin");
        console.log("🛠 Admin user detected:", email);
        window.location.href = "/admin-dashboard";
      } else {
        alert("Access denied. Please use a valid IGDTUW or admin email.");
        await signOut(auth);
      }

      console.log("✅ User signed in:", signedInUser);
    } catch (err) {
      console.error("❌ Google Sign-In Error:", err.message);
    }
  };

  // 🚪 Logout method
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setRole(null);
      console.log("✅ User logged out successfully");
    } catch (err) {
      console.error("❌ Logout error:", err.message);
    }
  };

  // 👀 Track user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("🔄 Auth state changed. Current user:", currentUser);

      // Safely set user
      setUser((prevUser) => {
        if (isSameUser(prevUser, currentUser)) return prevUser;
        return currentUser;
      });

      // Determine user role
      if (currentUser?.email) {
        const email = currentUser.email.toLowerCase();
        if (email.endsWith("@igdtuw.ac.in")) {
          setRole("student");
        } else if (
          email === "tiwarijishop@gmail.com" ||
          email === "nescafe.igdtuw@gmail.com"
        ) {
          setRole("admin");
        } else {
          setRole("unknown");
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, googleSignIn, logout }}>
      {/* Prevent rendering children until Firebase finishes loading */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook
export const useAuth = () => useContext(AuthContext);
