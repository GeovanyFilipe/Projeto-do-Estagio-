import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCytaFvFDsacg1a2fCYK2W7BcQV_krrGdg",
  authDomain: "angolanvpn-b8e9c.firebaseapp.com",
  projectId: "angolanvpn-b8e9c",
  storageBucket: "angolanvpn-b8e9c.firebasestorage.app",
  messagingSenderId: "104640504889",
  appId: "1:104640504889:web:757fb4afbe16500e2019e8",
  measurementId: "G-PMGZ2FNC9E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);