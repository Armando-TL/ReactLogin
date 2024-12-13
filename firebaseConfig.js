// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyCWxjfsZIqDVBZ228tIfI-T7CNd5VZEeJk",
    authDomain: "appreactfire.firebaseapp.com",
    projectId: "appreactfire",
    storageBucket: "appreactfire.firebasestorage.app",
    messagingSenderId: "452930975227",
    appId: "1:452930975227:web:9f7545b1039e6548e1c75e",
    measurementId: "G-0GJWDQTBL8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
