document.querySelector('.back-btn').addEventListener('click', () => window.history.back());

document.querySelector('.place-order-btn').addEventListener('click', () => {
    alert('Your order will now be prepared. Thank you for purchasing with Sugar X Salt MNL!');
    window.location.href = "index.html"
});