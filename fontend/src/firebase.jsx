import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzn5wcBSx-vEe7oNB-e9ntxzWp1FFvEBo",
  authDomain: "catfood-82265.firebaseapp.com",
  projectId: "catfood-82265",
  storageBucket: "catfood-82265.firebasestorage.app",
  messagingSenderId: "235915332841",
  appId: "1:235915332841:web:c914159eda41896b957478",
  measurementId: "G-JSTR8HCZQZ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 
export const db = getFirestore(app);