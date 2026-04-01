import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWcN__s_kckYf2G7QpCUttygjIjEIpaJk",
  authDomain: "nexusbq-da057.firebaseapp.com",
  databaseURL: "https://nexusbq-da057-default-rtdb.firebaseio.com",
  projectId: "nexusbq-da057",
  storageBucket: "nexusbq-da057.firebasestorage.app",
  messagingSenderId: "387751212874",
  appId: "1:387751212874:web:14d24cc2460cbb62edb3b3",
  measurementId: "G-S4B7E68L88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
