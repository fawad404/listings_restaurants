import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwZOeh_ohz9bysr7VhKbBUnR4PP330S-E",
  authDomain: "otp-verificaiton-c345d.firebaseapp.com",
  projectId: "otp-verificaiton-c345d",
  storageBucket: "otp-verificaiton-c345d.appspot.com",
  messagingSenderId: "333081282673",
  appId: "1:333081282673:web:4cd0ba1f1251482eecf3d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);