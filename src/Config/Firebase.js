import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from 'firebase/database'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDah9raR5XKsHcmlVqQZn8ATAOUl-N9dw8",
  authDomain: "todos-app-2024.firebaseapp.com",
  projectId: "todos-app-2024",
  storageBucket: "todos-app-2024.appspot.com",
  messagingSenderId: "872191696734",
  appId: "1:872191696734:web:0569f84edc95ed52a3f9cf"
};

const app = initializeApp(firebaseConfig);
const Auth = getAuth(app)
const STORAGE = getStorage(app)
const DATABASE = getDatabase(app)
const FIRESTORE = getFirestore(app)
export{
    Auth,
    STORAGE,
    DATABASE,
    FIRESTORE
}