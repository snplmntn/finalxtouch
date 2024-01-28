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

const apiUrl = 'https://fxt-api.dosshs.online/api';
// const apiUrl = 'http://localhost:1234/api';

//Checks User's Auth
function checkAuthState() {
    auth.onAuthStateChanged(function (user) {
      if (load) {
        if (!user) {
          window.location.href = "login.html";
        }
        load = false;
        fetchCart()
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
  localStorage.removeItem("userID");

  auth
    .signOut()
    .then(() => {
      window.location.href = "login.html";
    })
    .catch((error) => {
      // An error happened.
      console.error(error);
    });
});

let num1 = 1, num2 = 1, num3 = 1, num4 = 1;

document.querySelector('.add-to-cart1').addEventListener('click', () => {
  addToCart(1, num1)
})

document.querySelector('.add-to-cart2').addEventListener('click', () => {
  addToCart(2, num2)
})

document.querySelector('.add-to-cart3').addEventListener('click', () => {
  addToCart(3, num3)
})

document.querySelector('.add-to-cart4').addEventListener('click', () => {
  addToCart(4, num4)
})

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

const addToCart = async (prodId, prodQuantity) => {
  const userID = localStorage.getItem('userID');

  const product_data = JSON.stringify({
    userID: userID,
    productID: prodId ,
    quantity: prodQuantity
 });

  const response = await fetch(`${apiUrl}/cart`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: product_data,
})

if (!response.ok) {
  throw new Error(`HTTP error! Status: ${response.status}`);
 }
 
const data = await response.json();

alert("Added to Cart Successfully, Place the order whenever you're ready :)")
window.location.reload();
}

const fetchCart = async () => {
  const userID = localStorage.getItem('userID');
  try {
    const response = await fetch(`${apiUrl}/cart?userID=${userID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    
    document.querySelector('.number').textContent = data.results[0].quantity;
    document.getElementById('product-name').textContent =
  data.results[0].productID === 1 ? 'Carrot Cupcake' :
  data.results[0].productID === 2 ? 'Crinkles' :
  data.results[0].productID === 3 ? 'Blueberry Muffin' :
  data.results[0].productID === 4 && 'Tofu Dumplings';
    document.getElementById('product-size').textContent =
  data.results[0].productID === 1 ? 'Box of 5' :
  data.results[0].productID === 2 ? 'Pack of 20' :
  data.results[0].productID === 3 ? 'Box of 5' :
  data.results[0].productID === 4 && 'Tub of 12';

  let price = 0;

  data.results[0].productID === 1 ? price = 200 :
  data.results[0].productID === 2 ? price = 150 :
  data.results[0].productID === 3 ? price = 225 :
  data.results[0].productID === 4 && (price = 160);

  let imageLink;
  data.results[0].productID === 1 ? imageLink = 'url(./assets/product-1.png)' :
  data.results[0].productID === 2 ? imageLink = 'url(./assets/product-2.png)' :
  data.results[0].productID === 3 ? imageLink = 'url(./assets/product-3.png)' :
  data.results[0].productID === 4 && (imageLink = 'url(./assets/product-4.png)');

  document.querySelector('.cart-product-image').style.backgroundImage = imageLink;
  
  document.querySelector('#product-price').textContent = 'PHP ' + price * data.results[0].quantity;
  document.querySelector('#product-total-price').textContent = 'PHP ' + price * data.results[0].quantity;
  document.querySelector('#grand-total-price').textContent = 'PHP ' + (price * data.results[0].quantity + 65);




  } catch (err) {
    console.error('Error fetching order history:', err);
  }
}

