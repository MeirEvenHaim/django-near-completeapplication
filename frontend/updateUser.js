import { fetchUserData } from './FetchUserData.js';
import axios from 'https://cdn.skypack.dev/axios';

const SERVER = "http://127.0.0.1:8000/";

export const updateUser = async (userId) => {
    console.log(`Updating user with ID: ${userId}`);
    const newSName = prompt('Enter new name:');
    const newEmail = prompt('Enter new email:');
    const newAge = prompt('Enter new age:');
    const newAddress = prompt('Enter new address:');
    
    // Log the inputs to verify values
    console.log('New Name:', newSName);
    console.log('New Email:', newEmail);
    console.log('New Age:', newAge);
    console.log('New Address:', newAddress);
    
    if (newSName && newEmail && newAge && newAddress) {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You are not logged in!');
            window.location.href = 'login.html'; // Redirect to login if no token
            return;
        }

        try {
            const response = await axios.put(`${SERVER}profiles/${userId}/update/`, {
                sName: newSName,
                email: newEmail,
                sAge: newAge,
                address: newAddress
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Update response:', response); // Log the response
            alert('User updated successfully!');
            fetchUserData(); // Refresh user data after update
        } catch (error) {
            console.error('Failed to update user:', error);
            alert('Failed to update user! Please try again later.');
        }
    } else {
        alert('All fields are required!');
    }
}
