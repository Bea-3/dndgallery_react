import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_Rug_cuIIFk8U2fo5TZb8UIV20DhMLKI",
    authDomain: "dndgallery-auth.firebaseapp.com",
    projectId: "dndgallery-auth",
    storageBucket: "dndgallery-auth.appspot.com",
    messagingSenderId: "258313958436",
    appId: "1:258313958436:web:55a8f75f0c399cac4e54b1",
    measurementId: "G-6JY888090M"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);