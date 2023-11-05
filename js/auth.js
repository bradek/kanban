// Function to handle user login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const storedUsers = JSON.parse(localStorage.getItem('users'));

    if (storedUsers) {
        const user = storedUsers.find(u => u.username === username && u.password === password);
        if (user) {
            // Login successful, redirect to Kanban board
            alert('Login successful!\nRedirecting to Kanban board...');
            window.location.href = 'index.html';
        } else {
            document.getElementById('login-error').textContent = 'Invalid username or password.';
        }
    } else {
        document.getElementById('login-error').textContent = 'No users registered yet.';
    }
}

// Function to handle user registration
function register() {
    const regUsername = document.getElementById('regUsername').value;
    const regPassword = document.getElementById('regPassword').value;
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if there are no users; set the first registered user as an admin
    const role = storedUsers.length === 0 ? 'Admin' : 'User';

    if (storedUsers.some(u => u.username === regUsername)) {
        document.getElementById('register-error').textContent = 'Username already exists.';
    } else {
        storedUsers.push({ username: regUsername, password: regPassword, role: role }); // Set default role as 'User'
        localStorage.setItem('users', JSON.stringify(storedUsers));
        document.getElementById('register-error').textContent = 'Registration successful. You can now log in.';
    }
}