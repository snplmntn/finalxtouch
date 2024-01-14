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

const apiUrl = 'https://fxt-api.dosshs.online';

let load = false;

//Checks User's Auth
function checkAuthState() {
  auth.onAuthStateChanged(function (user) {
    if (load) {
      if (user) {
        window.location.href = "index.html";
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

//buttons
const signUp_button = document.querySelector(".signUpBtn");
const logIn_button = document.querySelector(".signInBtn");

// Signup function
function signup() {
  const username = document.getElementById("signup-username").value;
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById(
    "signup-confirm-password"
  ).value;
//   const termsCondition = document.querySelector(
//     "#terms-and-conditions-checkbox"
//   );

  // Validate input fields
  if (
    username === "" ||
    email === "" ||
    name === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    alert("Please fill up all the needed information.");
    return;
  }

  if (validate_email(email) == false) {
    alert("Email must be valid.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Password do not match.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(function (userCredential) {
    const user = auth.currentUser;

      // Create User data
    const user_data = JSON.stringify({
        name: name,
        username: username,
        email: email,
        password: password 
     });


      try {
        fetch(`${apiUrl}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: user_data,
        }).then(response => console.log(response))
        .then(() => {
            if (user) {
                alert("Signup successful!");
                window.location.href = "index.html"
            }
            
        })
      } catch(err) {
        console.error(err)
        alert("An Error Occured. Please try it again in a few minutes. If problem still occurs contact the developer.")
      }
    })
    .catch(function (error) {
      // Sign up failed
      const errorMessage = error.message;
      console.error("Error signing up:", errorMessage);
      alert(errorMessage);
    //   document.getElementById("signup-correct").innerHTML = "";
    });
}

// Login function
function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (email === "" || password === "") {
    alert("Please fill up all the needed information.");
  }
  if (validate_email(email) == false) {
    alert("Email is not valid.");
    return;
    // Don't continue running the code
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(function () {
        const user_data = JSON.stringify({
            email: email,
            password: password 
         });

        try {
            fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: user_data,
            }).then(response => console.log(response))
            .then(() => {
                alert("Login successful!");
            })
          } catch(err) {
            console.error(err)
            alert("An Error Occured. Please try it again in a few minutes. If problem still occurs contact the developer.")
          }
      // Login successful
      const user = auth.currentUser;
      if (user) {
          window.location.href = "index.html";
      }
    })
    .catch(function (error) {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode);
      alert(errorMessage)
    });
}

signUp_button.addEventListener("click", signup);
logIn_button.addEventListener("click", login);

// Validate Functions
function validate_email(email) {
  let expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}
