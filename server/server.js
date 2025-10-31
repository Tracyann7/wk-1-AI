const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// In-memory user storage (for prototype purposes)
const users = [];

// Course data
const courses = [
    {
        id: 1,
        title: "Introduction to Web Development",
        description: "Learn the fundamentals of HTML, CSS, and JavaScript",
        instructor: "John Doe",
        duration: "4 weeks",
        level: "Beginner",
        thumbnail: "https://placehold.co/300x200/4CAF50/ffffff?text=Web+Dev",
        lessons: [
            { id: 1, title: "HTML Basics", duration: "30 min" },
            { id: 2, title: "CSS Fundamentals", duration: "45 min" },
            { id: 3, title: "JavaScript Introduction", duration: "60 min" },
            { id: 4, title: "Building Your First Website", duration: "90 min" }
        ]
    },
    {
        id: 2,
        title: "Python for Data Science",
        description: "Master Python programming and data analysis with pandas and NumPy",
        instructor: "Jane Smith",
        duration: "6 weeks",
        level: "Intermediate",
        thumbnail: "https://placehold.co/300x200/2196F3/ffffff?text=Python+Data",
        lessons: [
            { id: 1, title: "Python Basics", duration: "40 min" },
            { id: 2, title: "NumPy Arrays", duration: "50 min" },
            { id: 3, title: "Pandas DataFrames", duration: "60 min" },
            { id: 4, title: "Data Visualization", duration: "55 min" },
            { id: 5, title: "Real-world Project", duration: "120 min" }
        ]
    },
    {
        id: 3,
        title: "UI/UX Design Fundamentals",
        description: "Create beautiful and user-friendly interfaces",
        instructor: "Mike Johnson",
        duration: "5 weeks",
        level: "Beginner",
        thumbnail: "https://placehold.co/300x200/FF9800/ffffff?text=UI+UX+Design",
        lessons: [
            { id: 1, title: "Design Principles", duration: "35 min" },
            { id: 2, title: "Color Theory", duration: "40 min" },
            { id: 3, title: "Typography", duration: "30 min" },
            { id: 4, title: "Wireframing", duration: "50 min" },
            { id: 5, title: "Prototyping in Figma", duration: "70 min" }
        ]
    },
    {
        id: 4,
        title: "React JS Masterclass",
        description: "Build modern web applications with React and hooks",
        instructor: "Sarah Williams",
        duration: "8 weeks",
        level: "Advanced",
        thumbnail: "https://placehold.co/300x200/9C27B0/ffffff?text=React+JS",
        lessons: [
            { id: 1, title: "React Basics", duration: "45 min" },
            { id: 2, title: "Components and Props", duration: "50 min" },
            { id: 3, title: "State and Lifecycle", duration: "55 min" },
            { id: 4, title: "Hooks Deep Dive", duration: "75 min" },
            { id: 5, title: "Context API", duration: "60 min" },
            { id: 6, title: "Building a Full App", duration: "150 min" }
        ]
    }
];

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Routes

// Signup endpoint
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = {
            id: users.length + 1,
            name,
            email,
            password: hashedPassword
        };
        users.push(user);

        // Generate token
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Verify token endpoint
app.get('/api/auth/verify', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (user) {
        res.json({
            valid: true,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Get all courses
app.get('/api/courses', authenticateToken, (req, res) => {
    res.json(courses);
});

// Get single course by ID
app.get('/api/courses/:id', authenticateToken, (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (course) {
        res.json(course);
    } else {
        res.status(404).json({ error: 'Course not found' });
    }
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
