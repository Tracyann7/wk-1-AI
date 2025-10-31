// Courses helper functions
// Note: API_URL is defined in auth.js

// Fetch all courses from backend
async function fetchCourses() {
    try {
        const token = getToken();
        console.log('Token:', token ? 'exists' : 'missing');
        console.log('Fetching from:', `${API_URL}/courses`);

        const response = await fetch(`${API_URL}/courses`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response:', errorData);
            throw new Error(errorData.error || 'Failed to fetch courses');
        }

        const courses = await response.json();
        console.log('Courses fetched:', courses.length);
        return { success: true, courses };
    } catch (error) {
        console.error('Fetch courses error:', error);
        return { success: false, error: error.message };
    }
}

// Fetch single course by ID
async function fetchCourse(courseId) {
    try {
        const token = getToken();
        const response = await fetch(`${API_URL}/courses/${courseId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch course');
        }

        const course = await response.json();
        return { success: true, course };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Get completed courses from localStorage
function getCompletedCourses() {
    const user = getUser();
    if (!user) return [];

    const completed = localStorage.getItem(`completed_courses_${user.id}`);
    return completed ? JSON.parse(completed) : [];
}

// Mark course as completed
function markCourseCompleted(courseId) {
    const user = getUser();
    if (!user) return;

    const completed = getCompletedCourses();
    if (!completed.includes(courseId)) {
        completed.push(courseId);
        localStorage.setItem(`completed_courses_${user.id}`, JSON.stringify(completed));
    }
}

// Check if course is completed
function isCourseCompleted(courseId) {
    const completed = getCompletedCourses();
    return completed.includes(courseId);
}

// Unmark course as completed
function unmarkCourseCompleted(courseId) {
    const user = getUser();
    if (!user) return;

    const completed = getCompletedCourses();
    const index = completed.indexOf(courseId);
    if (index > -1) {
        completed.splice(index, 1);
        localStorage.setItem(`completed_courses_${user.id}`, JSON.stringify(completed));
    }
}

// Get completion percentage
function getCompletionPercentage(totalCourses) {
    const completed = getCompletedCourses();
    return totalCourses > 0 ? Math.round((completed.length / totalCourses) * 100) : 0;
}
