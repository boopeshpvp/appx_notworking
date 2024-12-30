
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyAQhPViuABgmnBJSM-NF7Wie8ONYeWbB5c",
  authDomain: "appx-2a5e0.firebaseapp.com",
  projectId: "appx-2a5e0",
  storageBucket: "appx-2a5e0.appspot.com",
  messagingSenderId: "551725851307",
  appId: "1:551725851307:web:364c44624b7fcbe4e34dee",
  measurementId: "G-TM0WX2C0S7"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider= new GoogleAuthProvider();

export {auth,provider}

