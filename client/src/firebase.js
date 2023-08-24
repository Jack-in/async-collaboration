// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6korSBBh9b7-HGgJzj4dbAbigh5EYLrg",
  authDomain: "video-6b7dc.firebaseapp.com",
  projectId: "video-6b7dc",
  storageBucket: "video-6b7dc.appspot.com",
  messagingSenderId: "550003928665",
  appId: "1:550003928665:web:68f73e627289efdae78b48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export const provider = new  GoogleAuthProvider()
export default app;