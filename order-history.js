"use strict";

// const apiUrl = 'https://fxt-api.dosshs.online/api';
const apiUrl = 'http://localhost:1234/api';

const userID = 1;

const fetchOrder =  async () => {
  try {
    const response = await fetch(`${apiUrl}/order/o?userID=${userID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const orderTbody = document.querySelector('.order-history-content');
    const data = await response.json();
    data.results.reverse().forEach(order => {
      const row = document.createElement('tr');

      const columnsToDisplay = ['orderID', 'dateOrdered', 'name', 'quantity', 'totalPrice', 'status', 'paymentMethod'];

      columnsToDisplay.forEach(column => {
        const cell = document.createElement('td');

        if (column === 'status') {
          if(order[column] === 0) cell.textContent = 'Status';
          else if(order[column] === 1) cell.textContent = 'Order Placed';
          else if(order[column] === 2) cell.textContent = 'Order Confirmed';
          else if(order[column] === 3) cell.textContent = 'Preparing Order';
          else if(order[column] === 4) cell.textContent = 'To Deliver';
          else if(order[column] === 5) cell.textContent = 'In Transit';
          else if(order[column] === 6) cell.textContent = 'Delivered';
        } else if (column === 'paymentMethod') {
          if (order[column] === 0) {
            cell.textContent = 'Cash on Delivery';
          } else if (order[column] === 1) {
            cell.textContent = 'GCASH';
          } 
        } else cell.textContent = order[column];

        row.appendChild(cell);

      });

      orderTbody.appendChild(row);

    });

  } catch (err) {
    console.error('Error fetching order history:', err);
  }
    
}

fetchOrder();