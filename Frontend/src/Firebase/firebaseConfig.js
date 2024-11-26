
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDHiZCraSZcNGlRtwPAc2oQbSx6HhajjWA",
  authDomain: "tankedup-56984.firebaseapp.com",
  projectId: "tankedup-56984",
  storageBucket: "tankedup-56984.appspot.com",
  messagingSenderId: "789715046800",
  appId: "1:789715046800:web:71268a746d0f6a6095e315"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const itemDb = getStorage(app); 