// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF5ILvHzBaLXXsibg2R_l4q5Dig2QCkKY",
  authDomain: "bookhub-45efb.firebaseapp.com",
  projectId: "bookhub-45efb",
  storageBucket: "bookhub-45efb.appspot.com",
  messagingSenderId: "795414920201",
  appId: "1:795414920201:web:c03d35ef7b00f2f63a4cd8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;