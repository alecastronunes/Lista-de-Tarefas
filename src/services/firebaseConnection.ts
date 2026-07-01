/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATX5nKhkTDJnaGUxGOjZUuC3-dLtwL0vk",
  authDomain: "gerenciador-de-tarefas-e1b15.firebaseapp.com",
  projectId: "gerenciador-de-tarefas-e1b15",
  storageBucket: "gerenciador-de-tarefas-e1b15.firebasestorage.app",
  messagingSenderId: "235069758071",
  appId: "1:235069758071:web:e08886d319a92d9aa70472",
  measurementId: "G-K1D43C6E55",
};

// Initialize Firebase auth and databse
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
