// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCofiv3sXW9EJoiZosN8nk0Fzp6wFCPkNs",
  authDomain: "save-our-christmas.firebaseapp.com",
  projectId: "save-our-christmas",
  storageBucket: "save-our-christmas.firebasestorage.app",
  messagingSenderId: "291728151017",
  appId: "1:291728151017:web:a674fd27d9bd7ce454fb78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore and Storage exports
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
