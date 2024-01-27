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

//Checks User's Auth
function checkAuthState() {
    auth.onAuthStateChanged(function (user) {
      if (load) {
        if (!user) {
          window.location.href = "login.html";
        }
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

let num1 = 1, num2 = 1, num3 = 1, num4 = 1;

document.querySelector('.plus1').addEventListener('click', () => {
    num1++;
    document.querySelector('.number1').textContent = num1;
})

document.querySelector('.minus1').addEventListener('click', () => {
    if(num1 <= 1) return
    num1--;
    document.querySelector('.number1').textContent = num1;
})

document.querySelector('.plus2').addEventListener('click', () => {
    num2++;
    document.querySelector('.number2').textContent = num2;
})

document.querySelector('.minus2').addEventListener('click', () => {
    if(num2 <= 1) return
    num2--;
    document.querySelector('.number2').textContent = num2;
})

document.querySelector('.plus3').addEventListener('click', () => {
    num3++;
    document.querySelector('.number3').textContent = num3;
})

document.querySelector('.minus3').addEventListener('click', () => {
    if(num3 <= 1) return
    num3--;
    document.querySelector('.number3').textContent = num3;
})

document.querySelector('.plus4').addEventListener('click', () => {
    num4++;
    document.querySelector('.number4').textContent = num4;
})

document.querySelector('.minus4').addEventListener('click', () => {
    if(num4 <= 1) return
    num4--;
    document.querySelector('.number4').textContent = num4;
})