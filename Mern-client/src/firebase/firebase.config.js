// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ6wQqEnZ8rL6v5UVG5fjGNwvKF-PUO0E",
  authDomain: "bookhub-dc5ad.firebaseapp.com",
  projectId: "bookhub-dc5ad",
  storageBucket: "bookhub-dc5ad.appspot.com",
  messagingSenderId: "177922313191",
  appId: "1:177922313191:web:211780335d26fbcad14b42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;