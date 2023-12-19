// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAR5N3irsdqwxKXffvq3RAAKsOfa63YMSA",
  authDomain: "student-portal-5f73d.firebaseapp.com",
  projectId: "student-portal-5f73d",
  storageBucket: "student-portal-5f73d.appspot.com",
  messagingSenderId: "853030603025",
  appId: "1:853030603025:web:f5fcfc827014a5dafc64b0",
  measurementId: "G-PRJ8DSMJY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

export const auth = getAuth();
