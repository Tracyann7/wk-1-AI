// Authentication helper functions
const API_URL = 'http://localhost:3000/api';

// Get token from localStorage
function getToken() {
    return localStorage.getItem('token');
}

// Save token to localStorage
function saveToken(token) {
    localStorage.setItem('token', token);
}

// Remove token from localStorage
function removeToken() {
    localStorage.removeItem('token');
}

// Get user from localStorage
function getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Save user to localStorage
function saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

// Remove user from localStorage
function removeUser() {
    localStorage.removeItem('user');
}

// Check if user is authenticated
function isAuthenticated() {
    return getToken() !== null;
}

// Signup function
async function signup(name, email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Signup failed');
        }

        saveToken(data.token);
        saveUser(data.user);

        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Login function
async function login(email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        saveToken(data.token);
        saveUser(data.user);

        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Logout function
function logout() {
    removeToken();
    removeUser();
    window.location.href = '/login.html';
}

// Verify token with backend
async function verifyToken() {
    const token = getToken();
    if (!token) {
        return false;
    }

    try {
        const response = await fetch(`${API_URL}/auth/verify`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            removeToken();
            removeUser();
            return false;
        }

        return true;
    } catch (error) {
        removeToken();
        removeUser();
        return false;
    }
}

// Protect page (redirect to login if not authenticated)
async function protectPage() {
    const valid = await verifyToken();
    if (!valid) {
        window.location.href = '/login.html';
        return false;
    }
    return true;
}

// Redirect to home if already authenticated
function redirectIfAuthenticated() {
    if (isAuthenticated()) {
        window.location.href = '/index.html';
    }
}
