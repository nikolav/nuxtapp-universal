// update tools
// $ npm install -g firebase-tools
// $ firebase init

// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyBAwgoMo_9merZjAJFfsv8036n9vaGYjTk",
  authDomain: "petrol-nikolav-rs--p4vtfrj3d8q.firebaseapp.com",
  projectId: "petrol-nikolav-rs--p4vtfrj3d8q",
  storageBucket: "petrol-nikolav-rs--p4vtfrj3d8q.firebasestorage.app",
  messagingSenderId: "598697653220",
  appId: "1:598697653220:web:f28d1533e06ee805c58df1",
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
