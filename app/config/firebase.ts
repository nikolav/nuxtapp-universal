// update tools
// $ npm install -g firebase-tools
// $ firebase init

// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyDQK3AWnvhc3d7c9aUa0UDq0Pi6Np1V2Wk",
  authDomain: "junhzyqmxyn--dev.firebaseapp.com",
  projectId: "junhzyqmxyn--dev",
  storageBucket: "junhzyqmxyn--dev.firebasestorage.app",
  messagingSenderId: "527729584059",
  appId: "1:527729584059:web:f5508c8f9fe7bdcf23469e",
};

// Initialize Firebase
export const app = 0 < getApps().length ? getApp() : initializeApp(config);

// Initialize Cloud Firestore and get a reference to the service
export const auth = getAuth(app);

// init auth providers
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: "consent select_account",
});

export const firebaseOAuthProviders = {
  google: googleAuthProvider,
};

export const firestore = getFirestore(app);
