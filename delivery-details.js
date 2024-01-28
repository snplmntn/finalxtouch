"use strict";

const apiUrl = 'https://fxt-api.dosshs.online/api';
// const apiUrl = 'http://localhost:1234/api';

document.querySelector('.back-btn').addEventListener('click', () => window.history.back());

document.querySelector('.place-order-btn').addEventListener('click', async () => {
    placeOrder()
});

let selectedPayment = null;

  function handlePaymentClick(paymentType) {
    selectedPayment = paymentType;

    document.querySelectorAll('.payment').forEach(option => {
      option.classList.remove('selected');
    });

    document.getElementById(`${paymentType}Option`).classList.add('selected');
  }

  document.getElementById('cashOption').addEventListener('click', () => {
    handlePaymentClick('cash');
  });

  document.getElementById('gcashOption').addEventListener('click', () => {
    handlePaymentClick('gcash');
  });


  let grandTotal = 0, quantity = 0, productId = 0;
  
  const placeOrder = async () => {
    const note = document.querySelector('.note-input').value;
    const address = document.querySelector('.address-input').value;
    const number = document.querySelector('.phone-input').value;

    if(!address || !number || selectedPayment === null) return alert("Please fill up all the necessary information");

    const userID = localStorage.getItem('userID');
  
    const product_data = JSON.stringify({
      userID: userID,
      productID: productId ,
      note: note,
      address: address,
      number: number,
      totalPrice: grandTotal,
      paymentMethod: selectedPayment,
      quantity: quantity
   });
  
    const response = await fetch(`${apiUrl}/order`, {
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
  
  if(data) alert('Your order will now be prepared. Thank you for purchasing with Sugar X Salt MNL!');
  window.location.href = "order.html"
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
  
      
      document.querySelector('#product-number').textContent = 'X' + data.results[0].quantity;
      quantity = data.results[0].quantity;
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

    productId = data.results[0].productID;
    
    document.querySelector('#product-price').textContent = 'PHP ' + price * data.results[0].quantity;
    document.querySelector('#product-total-price').textContent = 'PHP ' + price * data.results[0].quantity;
    document.querySelector('#grand-total-price').textContent = 'PHP ' + (price * data.results[0].quantity + 65);
    grandTotal = price * data.results[0].quantity + 65;
  
  
  
  
    } catch (err) {
      console.error('Error fetching order history:', err);
    }
  }
  
  fetchCart();