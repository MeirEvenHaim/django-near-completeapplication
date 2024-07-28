import { updateUser } from './updateUser.js';
import { deleteUser } from './deleteUser.js';
import axios from 'https://cdn.skypack.dev/axios';

const SERVER = "http://127.0.0.1:8000/";

export const displayUserData = (userDataArray) => {
    const userDataDiv = document.getElementById('user-data');
    userDataDiv.innerHTML = '';

    if (Array.isArray(userDataArray) && userDataArray.length > 0) {
        userDataArray.forEach(userData => {
            if (userData && userData.email && userData.sName) {
                userDataDiv.innerHTML += `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="${SERVER + userData.image}" class="card-img-top" alt="${userData.sName}">
                            <div class="card-body">
                                <h5 class="card-title">${userData.sName}</h5>
                                <p class="card-text">Email: ${userData.email}</p>
                                <p class="card-text">Age: ${userData.sAge}</p>
                                <p class="card-text">Address: ${userData.address}</p>
                                <button class="btn btn-primary btn-update" data-id="${userData.id}">Update</button>
                                <button class="btn btn-danger btn-delete" data-id="${userData.id}">Delete</button>
                            </div>
                        </div>
                    </div>
                `;
            }
        });

        // Add event listeners for update and delete buttons
        document.querySelectorAll('.btn-update').forEach(button => {
            button.addEventListener('click', (event) => {
                const userId = event.currentTarget.getAttribute('data-id');
                if (userId) {
                    updateUser(userId);
                } else {
                    console.error('User ID is not defined!');
                }
            });
        });

        document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', (event) => {
                const userId = event.currentTarget.getAttribute('data-id');
                if (userId) {
                    deleteUser(userId);
                } else {
                    console.error('User ID is not defined!');
                }
            });
        });
    } else {
        userDataDiv.innerHTML = '<p>No user data available.</p>';
    }
}
