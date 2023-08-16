// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getDatabase, ref, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_W512ExrKqzR2aa_5WI3QU4ilezvD9XU",
  authDomain: "delivery-system-69ca9.firebaseapp.com",
  databaseURL: "https://delivery-system-69ca9-default-rtdb.firebaseio.com",
  projectId: "delivery-system-69ca9",
  storageBucket: "delivery-system-69ca9.appspot.com",
  messagingSenderId: "730834109314",
  appId: "1:730834109314:web:8644a3a44008e1f10c059b",
  measurementId: "G-C4K236TSK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase();
export default onValue;
export const dbRef = ref(db, "UserData");
export const dbRef2 = ref(db, "TransporterMessages");
export const dbRef3 = ref(db, "ManufacturerMessages");
