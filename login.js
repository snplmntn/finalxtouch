const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Retrieve the last active state from localStorage
const lastActiveState = localStorage.getItem('activeState');
if (lastActiveState) {
    container.classList.add(lastActiveState);
}

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
     // Store the current active state in localStorage
    localStorage.setItem('activeState', 'active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
    // Store the current active state in localStorage
    localStorage.setItem('activeState', '');
});