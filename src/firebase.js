import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from "firebase/auth";
import Cookies from "js-cookie";
import { setDoc, doc, serverTimestamp, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useNavigate } from "react-router-dom";

// Every value comes from your own Firebase project via REACT_APP_FIREBASE_*
// env vars (see .env.example) — nothing is hardcoded to any specific project.
// Non-empty placeholders are used when the vars are unset so that getAuth()
// doesn't throw "auth/invalid-api-key" at module load and blank out the ENTIRE
// app (including the landing page and pose-detection features, which don't use
// Firebase at all). Only Google sign-in stays disabled until real keys exist.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "demo-api-key",
  authDomain:
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "demo",
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "demo.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_ID || "000000000000",
  appId:
    process.env.REACT_APP_FIREBASE_APP_ID ||
    "1:000000000000:web:0000000000000000",
};

// True only when a real Firebase API key has been supplied.
export const firebaseConfigured = Boolean(
  process.env.REACT_APP_FIREBASE_API_KEY
);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const signInWithGoogle = async () => {
  if (!firebaseConfigured) {
    alert(
      "Google sign-in isn't configured for this deployment yet. Add your Firebase keys (REACT_APP_FIREBASE_*) to enable login."
    );
    return;
  }
  try {
    const googleProvider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, googleProvider);

    const accessToken = res.user.accessToken;
    Cookies.set("uat", accessToken);
    const uid = res.user.uid.toString();
    Cookies.set("userID", uid);

    const name = res.user.displayName;
    const email = res.user.email;
    const photo = res.user.photoURL;

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("photo", photo);
    const docRef = doc(db, "user", uid);
    await setDoc(docRef, {
      userID: uid,
      timeStamp: serverTimestamp(),
      name: res.user.displayName,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

//   Logout Fucntion
export const logout = () => {
  signOut(auth);
  localStorage.clear();

  Cookies.remove("userID");
  Cookies.remove("uat");
};
