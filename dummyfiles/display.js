const SERVER = "http://127.0.0.1:8000/";

document.addEventListener('DOMContentLoaded', () => {
    fetchUserData();
    
    // Logout functionality
    document.getElementById('logout-button').addEventListener('click', () => {
        localStorage.removeItem('token');
        alert('Logged out successfully!');
        window.location.href = 'login.html'; // Redirect to login page
    });
});

// GET method axios function to receive data from the server
const fetchUserData = async () => {
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

// Function to display the user data using the data from the GET method inside the fetchUserData function (axios)
const displayUserData = (userDataArray) => {
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
                const userId = event.currentTarget.getAttribute('data-id'); // Changed to event.currentTarget
                if (userId) {
                    updateUser(userId);
                } else {
                    console.error('User ID is not defined!');
                }
            });
        });

        document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', (event) => {
                const userId = event.currentTarget.getAttribute('data-id'); // Changed to event.currentTarget
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

// Update function for USER
const updateUser = async (userId) => {
    // For simplicity, we're using prompts for updates. Replace with a form or modal as needed.
    const newSName = prompt('Enter new name:');
    const newEmail = prompt('Enter new email:');
    const newAge = prompt('Enter new age:');
    const newAddress = prompt('Enter new address:');
    
    if (newSName && newEmail && newAge && newAddress) {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You are not logged in!');
            window.location.href = 'login.html'; // Redirect to login if no token
            return;
        }

        try {
            await axios.put(SERVER + `profiles/${userId}/update/`, {
                sName: newSName,
                email: newEmail,
                sAge: newAge,
                address: newAddress
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('User updated successfully!');
            fetchUserData(); // Refresh user data after update
        } catch (error) {
            console.error('Failed to update user:', error);
            alert('Failed to update user! Please try again later.');
        }
    }
}

// Delete function for USER
const deleteUser = async (userId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You are not logged in!');
        window.location.href = 'login.html'; // Redirect to login if no token
        return;
    }

    try {
        await axios.delete(SERVER + `profiles/${userId}/delete/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        alert('User deleted successfully!');
        fetchUserData(); // Refresh user data after deletion
    } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Failed to delete user! Please try again later.');
    }
}
