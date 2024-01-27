const apiUrl = "http://localhost:1234/api";
// const apiUrl = "https://fxt-api.dosshs.online/api";

document.querySelector('.place-order-btn-cart').addEventListener('click', async () => {
  window.location.href = "product-page-delivery-details.html"

    // try {
    //     const response = await fetch(`${apiUrl}/cart/`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });
    
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    
    //     const data = await response.json();
    
    //     if (data.count > 0) {
    //       document.querySelector(".customer-count").innerHTML = data.count;
    //     } else {
    //       document.querySelector(".dashboard-amount-1st").innerHTML = "...";
    //     }
    //   } catch (err) {
    //     console.error('Error fetching customer count🐶:', err);
    //   }
})