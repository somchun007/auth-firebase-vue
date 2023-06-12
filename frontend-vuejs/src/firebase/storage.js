import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDYLAgFuuGYtgZnrIzDJD1vMC5SL_rKnPo",
  authDomain: "todo-firebase-d24a4.firebaseapp.com",
  databaseURL: "https://todo-firebase-d24a4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todo-firebase-d24a4",
  storageBucket: "todo-firebase-d24a4.appspot.com",
  messagingSenderId: "1058338117661",
  appId: "1:1058338117661:web:a3ebbf0fc3e66412b6cef4"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase();

export { storage, database }