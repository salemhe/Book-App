// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_WrIDkMHc5rAAWgI1xagnAqkpxJgHBfs",
  authDomain: "mern-book-inventory-d4756.firebaseapp.com",
  projectId: "mern-book-inventory-d4756",
  storageBucket: "mern-book-inventory-d4756.appspot.com",
  messagingSenderId: "919628763333",
  appId: "1:919628763333:web:2fc383f2ccd40bf90f60ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;