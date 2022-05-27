// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD13qzXSUOZVb-7QUpEUZ1qWX23DbyTo14",
  authDomain: "gallery-e38d5.firebaseapp.com",
  projectId: "gallery-e38d5",
  storageBucket: "gallery-e38d5.appspot.com",
  messagingSenderId: "188112194666",
  appId: "1:188112194666:web:c5dbdc2266b773f6508e13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export{
    app
}
const storage = getStorage(app);
export default storage;
