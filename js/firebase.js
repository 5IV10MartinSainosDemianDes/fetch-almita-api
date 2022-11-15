// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTw6FiZcAGyq_RbB31tSRPWL_e3H0kUJ0",
  authDomain: "practica-fetch-almita.firebaseapp.com",
  projectId: "practica-fetch-almita",
  storageBucket: "practica-fetch-almita.appspot.com",
  messagingSenderId: "458147143536",
  appId: "1:458147143536:web:280672c31681b9943c39b5",
  measurementId: "G-029W6G3MRF"
};

// Use this to initialize the firebase App
firebase.initializeApp(firebaseConfig);


export const firestore = firebase.firestore();

module.exports.firebase = firebase;
module.exports.firestore = firestore;