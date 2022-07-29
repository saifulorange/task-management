import firebase from 'firebase/compat/app';
import { getFirestore} from 'firebase/firestore'
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD6v9UTDtKkAXmYXVH3M3heR-EJCTSEAXI",
    authDomain: "task-management-855ad.firebaseapp.com",
    projectId: "task-management-855ad",
    storageBucket: "task-management-855ad.appspot.com",
    messagingSenderId: "242743644033",
    appId: "1:242743644033:web:da4b5a48941cc5e8202280"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  const db= getFirestore(firebaseApp)

  export  {auth , provider ,db}