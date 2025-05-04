import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail, 
    signOut 
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Firebase configuration (Replace with your actual Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyBt3YNeHrfTmJ2oSR_yC6fUfxL-Rv5U-Fo",
  authDomain: "weather-app-f5ee9.firebaseapp.com",
  projectId: "weather-app-f5ee9",
  storageBucket: "weather-app-f5ee9.firebasestorage.app",
  messagingSenderId: "294785325356",
  appId: "1:294785325356:web:7974fd373bf9e397e2b489",
  measurementId: "G-KZYHB0FW1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Google Sign-In Provider
const provider = new GoogleAuthProvider();

// Function to store user data in Firestore
const storeUserInFirestore = async (user) => {
    if (!user) return;
    
    try {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
            await setDoc(userRef, {
                uid: user.uid,
                name: user.displayName || "No Name",
                email: user.email,
                createdAt: new Date()
            });
        }
    } catch (error) {
        console.error("Error storing user:", error);
    }
};

// Function to reset password
const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent.");
    } catch (error) {
        console.error("Error resetting password:", error);
    }
};

// Function to log out the user
const logout = async () => {
    try {
        await signOut(auth);
        console.log("User signed out successfully.");
    } catch (error) {
        console.error("Sign-out error:", error);
    }
};

export { 
    auth, 
    provider, 
    signInWithPopup, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail, 
    storeUserInFirestore, 
    resetPassword, 
    logout 
};
