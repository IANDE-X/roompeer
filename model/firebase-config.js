import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "@firebase/app-check";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth, EmailAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBCetCyfSzNQc35S_XrZAVbniFaKMBp2Mw",
  authDomain: "roompeer-6ef1c.firebaseapp.com",
  projectId: "roompeer-6ef1c",
  storageBucket: "roompeer-6ef1c.appspot.com",
  messagingSenderId: "359087035492",
  appId: "1:359087035492:web:68f8a390d13e8b18847b71",
  measurementId: "G-N68JC8KG78",
};

let firebaseInstance;
getApps().length === 0 ? (firebaseInstance = initializeApp(firebaseConfig)) : (firebaseInstance = getApp());

const db = getFirestore(firebaseInstance);
const auth = getAuth(firebaseInstance);
const storage = getStorage(firebaseInstance);
const timestamp = serverTimestamp;

// TO BE FIXED: error - unhandledRejection: ReferenceError: self is not defined
const appCheck = initializeAppCheck(firebaseInstance, {
  provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
  isTokenAutoRefreshEnabled: true,
});

export const getUserCredential = (email, password) => {
  return EmailAuthProvider.credential(email, password);
};

export { db, auth, timestamp, storage, firebaseInstance };
