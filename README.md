# Mini E-Learning Platform

A fully functional e-learning platform prototype built with Node.js, Express, and vanilla JavaScript. This project demonstrates authentication, course management, and progress tracking using modern web technologies.

## Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Course Catalog**: Browse 4+ courses with detailed information
- **Course Details**: View lessons, instructor info, and duration
- **Progress Tracking**: Mark courses as completed (saved in localStorage)
- **Statistics Dashboard**: Track total courses, completed courses, and completion rate
- **Responsive Design**: Bootstrap-based UI that works on all devices
- **Modern UI**: Clean interface with smooth animations and hover effects

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **HTML5** - Markup
- **CSS3** - Custom styling with CSS variables
- **Bootstrap 5** - UI framework
- **Vanilla JavaScript** - Client-side logic
- **localStorage** - Course completion persistence

## Project Structure

```
/AI
├── server/
│   └── server.js          # Express server with auth endpoints
├── public/
│   ├── index.html         # Home page (course list)
│   ├── course.html        # Course detail page
│   ├── login.html         # Login page
│   ├── signup.html        # Signup page
│   ├── css/
│   │   └── styles.css     # Custom styles
│   └── js/
│       ├── auth.js        # Authentication helper functions
│       └── courses.js     # Course management functions
├── package.json           # Dependencies
└── README.md             # Documentation
```

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm start
   ```

3. **Open in browser**:
   Navigate to `http://localhost:3000`

## Usage

1. **Sign Up**: Create a new account on the signup page
2. **Login**: Login with your credentials
3. **Browse Courses**: View available courses on the home page
4. **View Details**: Click any course to see lessons and details
5. **Track Progress**: Mark courses as completed to track your progress

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login with credentials
- `GET /api/auth/verify` - Verify JWT token

### Courses
- `GET /api/courses` - Get all courses (protected)
- `GET /api/courses/:id` - Get single course by ID (protected)

## Data Storage

- **User Data**: Stored in-memory (for prototype purposes)
- **Course Data**: Defined in server.js
- **Progress Data**: Stored in browser localStorage per user

## Available Courses

1. **Introduction to Web Development** - HTML, CSS, JavaScript basics
2. **Python for Data Science** - Python, NumPy, Pandas
3. **UI/UX Design Fundamentals** - Design principles and prototyping
4. **React JS Masterclass** - Modern React with hooks

## Security Notes

⚠️ **For Development Only**: This is a prototype with the following limitations:
- In-memory user storage (resets on server restart)
- Simple JWT secret (should use environment variables)
- No password reset functionality
- No email verification
- No rate limiting

For production use, implement:
- Database storage (MongoDB, PostgreSQL, etc.)
- Environment variables for secrets
- Password reset via email
- Email verification
- Rate limiting and security headers
- HTTPS encryption

## Future Enhancements

- [ ] Add video player for lessons
- [ ] Implement quiz functionality
- [ ] Add course ratings and reviews
- [ ] User profile management
- [ ] Course search and filtering
- [ ] Certificate generation
- [ ] Progress bars for individual lessons
- [ ] Dark mode toggle
- [ ] Admin dashboard for managing courses

## Credits

Built as part of Week 1 VibeCoding assignment to demonstrate:
- Full-stack web development
- RESTful API design
- Modern frontend techniques
- Authentication and authorization
- State management with localStorage
- Responsive design principles

## License

MIT License - Free to use for educational purposes
