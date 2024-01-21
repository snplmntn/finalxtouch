"use strict";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  update,
  get,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

let load = false;
let haveUser;
//Checks User's Auth
function checkAuthState() {
    auth.onAuthStateChanged(function (user) {
      if (load) {
        if (!user) {
          window.location.href = "login.html";
        }
        haveUser = user;
        load = false;
      }
    });
  }
  
  window.addEventListener("load", function () {
    load = true;
    checkAuthState();
  });
  
  const firebaseConfig = {
      apiKey: "AIzaSyBZBXvvcUmziim1m6LOiwcPZ8pfPxPL4Js",
      authDomain: "finalxtouch-d81ef.firebaseapp.com",
      projectId: "finalxtouch-d81ef",
      storageBucket: "finalxtouch-d81ef.appspot.com",
      messagingSenderId: "531973026813",
      appId: "1:531973026813:web:888570d7e75f42612edf94"
    };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();


const logout_button = document.querySelector(".signOutBtn");


logout_button.addEventListener("click", function () {
    // Calls the signOut() method to log out the user
    // localStorage.removeItem("userName");
    // localStorage.removeItem("userUID");
  
    auth
      .signOut()
      .then(() => {
        window.location.href = "login.html";
      })
      .catch((error) => {
        // An error happened.
      });
  });

const buyNow1 = document.querySelector(".product-1-button")
const buyNow2 = document.querySelector(".product-2-button")
const buyNow3 = document.querySelector(".product-3-button")

buyNow1.addEventListener("click", function () {
  if(!haveUser) {
    alert("You need to sign in first.")
    window.location.href = "login.html";
  }
});

buyNow2.addEventListener("click", function () {
  if(!haveUser) {
    alert("You need to sign in first.")
    window.location.href = "login.html";
  }
});

buyNow3.addEventListener("click", function () {
  if(!haveUser) {
    alert("You need to sign in first.")
    window.location.href = "login.html";
  }
});