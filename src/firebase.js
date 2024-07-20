// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUjVytm8vsw9G5LPEX3e0xccw5Q_OzdHE",
  authDomain: "ridetest-143a3.firebaseapp.com",
  projectId: "ridetest-143a3",
  storageBucket: "ridetest-143a3.appspot.com",
  messagingSenderId: "599178643847",
  appId: "1:599178643847:web:905cfec9ea459e21c8eb22",
  measurementId: "G-SLYM045ZZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
