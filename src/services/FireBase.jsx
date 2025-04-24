// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrkOUgB2jatZcim0GxsPpuhtvD5N54gUw",
  authDomain: "tripplannerfirst.firebaseapp.com",
  projectId: "tripplannerfirst",
  storageBucket: "tripplannerfirst.firebasestorage.app",
  messagingSenderId: "1049962405209",
  appId: "1:1049962405209:web:b701b6602f958bebb1c048",
  measurementId: "G-7087HS2EBX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);