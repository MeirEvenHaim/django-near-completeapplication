import { fetchUserData } from './FetchUserData.js';
import { displayUserData } from './displayUserData.js';
import { updateUser } from './updateUser.js';
import { deleteUser } from './deleteUser.js';
import axios from 'https://cdn.skypack.dev/axios';


document.addEventListener('DOMContentLoaded', async () => {
    const userData = await fetchUserData();
    displayUserData(userData);

    // Add event listeners for update and delete buttons
    document.getElementById('user-data').addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-update')) {
            const userId = event.target.getAttribute('data-id');
            if (userId) {
                updateUser(userId);
            } else {
                console.error('User ID is not defined!');
            }
        }

        if (event.target.classList.contains('btn-delete')) {
            const userId = event.target.getAttribute('data-id');
            if (userId) {
                deleteUser(userId);
            } else {
                console.error('User ID is not defined!');
            }
        }
    });

    document.getElementById('logout-button').addEventListener('click', () => {
        localStorage.removeItem('token');
        alert('Logged out successfully!');
        window.location.href = 'login.html';
    });
});
