const SERVER = "http://127.0.0.1:8000/";

document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded');

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await axios.post(SERVER + 'register/', {
                    username: username,
                    email: email,
                    password: password
                });
                if (response.status === 201) { // Assuming 201 Created is the success status
                    alert('Registration successful!');
                    // Fetch and display existing profiles after successful registration
                    fetchProfiles();
                } else {
                    alert('Registration failed! Please try again.');
                }
            } catch (error) {
                console.error('Registration failed:', error.response ? error.response.data : error.message);
                alert('Registration failed! Please check your input and try again.');
            }
        });
    }

    // Function to fetch and display existing profiles
    async function fetchProfiles() {
        try {
            const response = await axios.get(SERVER + 'profiles/');
            const profiles = response.data;
            const profileList = document.getElementById('profile-list');
            profileList.innerHTML = ''; // Clear existing profiles

            profiles.forEach(profile => {
                const listItem = document.createElement('li');
                listItem.textContent = `Username: ${profile.username}, Email: ${profile.email}`;
                profileList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Failed to fetch profiles:', error.response ? error.response.data : error.message);
        }
    }

    // Initial fetch of profiles when the page loads
    fetchProfiles();
});
