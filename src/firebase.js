import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7bajWpKPDJ6LWiy62lmPeCRlCK_V50ac",
  authDomain: "brieflyyt-auth.firebaseapp.com",
  projectId: "brieflyyt-auth",
  storageBucket: "brieflyyt-auth.firebasestorage.app",
  messagingSenderId: "1074790220673",
  appId: "1:1074790220673:web:c326eb18026811f13e9e80"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };