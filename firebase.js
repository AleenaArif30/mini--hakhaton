import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged ,sendEmailVerification ,signOut,signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore , collection, addDoc, getDocs,deleteDoc,doc,query,orderBy,serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";;

const firebaseConfig = {
    apiKey: "AIzaSyDyjsCH9gMOYTQNp5I6UpNf6l2_m5z46-s",
    authDomain: "authentication-88aab.firebaseapp.com",
    projectId: "authentication-88aab",
    storageBucket: "authentication-88aab.firebasestorage.app",
    messagingSenderId: "691944528141",
    appId: "1:691944528141:web:93a77f3b8e262c490ff844",
    measurementId: "G-QTVYSR3DQX"
  };

  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const db = getFirestore(app);


  

  export{auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,sendEmailVerification,signOut,signInWithPopup, GoogleAuthProvider,provider ,db, collection, addDoc, getDocs,deleteDoc,doc,query,orderBy,serverTimestamp,getAuth } 


  