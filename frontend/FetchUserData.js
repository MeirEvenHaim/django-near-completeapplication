import { displayUserData } from './displayUserData.js';
import axios from 'https://cdn.skypack.dev/axios';
import { updateUser } from './updateUser.js'; 


const SERVER = "http://127.0.0.1:8000/";

export const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You are not logged in!');
        window.location.href = 'login.html'; // Redirect to login if no token
        return;
    }

    try {
        const response = await axios.get(SERVER + 'profiles/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('User data fetched:', response.data);
        const userData = response.data;
        displayUserData(userData);
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        alert('Failed to fetch user data! Please try again later.');
    }
}