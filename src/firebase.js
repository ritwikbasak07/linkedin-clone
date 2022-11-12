import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: "AIzaSyBlcYK8fkFJJN1evL4Fjj8EzkZNtQrIvfY",
    authDomain: "linkedin-clone-a3ec3.firebaseapp.com",
    projectId: "linkedin-clone-a3ec3",
    storageBucket: "linkedin-clone-a3ec3.appspot.com",
    messagingSenderId: "179547613015",
    appId: "1:179547613015:web:46f35287a5cd5a3c9a4012",
    measurementId: "G-0GB0L7SWQ1",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;