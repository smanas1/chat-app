// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtKW7GIIxqaBDw9miFmqliOuAQLDC4CD8",
  authDomain: "chat-app-149e6.firebaseapp.com",
  projectId: "chat-app-149e6",
  storageBucket: "chat-app-149e6.appspot.com",
  messagingSenderId: "693930294977",
  appId: "1:693930294977:web:8103682255b2d36ad71e40",
  measurementId: "G-3QY3JWL4RL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;
