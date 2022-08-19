
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRGZT2zUANDb510Cdn7RlGwORLRSc3VWI",
  authDomain: "rearrangescreens.firebaseapp.com",
  databaseURL: "https://rearrangescreens-default-rtdb.firebaseio.com",
  projectId: "rearrangescreens",
  storageBucket: "rearrangescreens.appspot.com",
  messagingSenderId: "616944017165",
  appId: "1:616944017165:web:6cc5e70a69b282bc3f9a44",
  measurementId: "G-BS1HJ1C09Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const db = getFirestore(app);
//export const myauth = getAuth(app);