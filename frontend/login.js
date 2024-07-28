import axios from 'https://cdn.skypack.dev/axios';

const SERVER = "http://127.0.0.1:8000/";
console.log('login.js script loaded');

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            try {
                const response = await axios.post(SERVER + 'login/', {
                    username: username,
                    password: password
                });

                const token = response.data.access;
                localStorage.setItem('token', token);
                redirectToDisplayPage();
            } catch (error) {
                const errorMessage = document.getElementById('error-message');
                errorMessage.innerText = 'Login failed: ' + (error.response ? error.response.data.detail : 'Server not reachable');
                console.error('Login failed:', error);
            }
        });
    }
});

// Function for redirection
const redirectToDisplayPage = () => {
    console.log('Preparing to redirect...');
    console.log('Redirecting to display.html...');
    window.location.href = 'display.html';
};
