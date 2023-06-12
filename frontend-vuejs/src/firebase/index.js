import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYLAgFuuGYtgZnrIzDJD1vMC5SL_rKnPo",
  authDomain: "todo-firebase-d24a4.firebaseapp.com",
  projectId: "todo-firebase-d24a4",
  storageBucket: "todo-firebase-d24a4.appspot.com",
  messagingSenderId: "1058338117661",
  appId: "1:1058338117661:web:a3ebbf0fc3e66412b6cef4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }