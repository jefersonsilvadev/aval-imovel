
import React from 'react';
import ReactDOM from 'react-dom/client';

import Dashboard from './Dashboard';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_KeFQoLh_wPj0PU-elxmOHsfx_y3QbcY",
  authDomain: "imovel-aval-f9c28.firebaseapp.com",
  projectId: "imovel-aval-f9c28",
  storageBucket: "imovel-aval-f9c28.appspot.com",
  messagingSenderId: "518750139928",
  appId: "1:518750139928:web:43e13cdfa8cb5caa14f56d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>
);