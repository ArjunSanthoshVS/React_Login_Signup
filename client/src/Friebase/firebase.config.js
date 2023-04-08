import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCnSejIB8gjV8qsCouFMWOqBNic5Kjr8vc",
    authDomain: "redwings-379807.firebaseapp.com",
    projectId: "redwings-379807",
    storageBucket: "redwings-379807.appspot.com",
    messagingSenderId: "95904298791",
    appId: "1:95904298791:web:44a737b1f2cb5f149b5b02",
    measurementId: "G-CCP04T1L64"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()