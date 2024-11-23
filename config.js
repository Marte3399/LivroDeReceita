// Get DOM elements
const darkModeToggle = document.getElementById('darkModeToggle');

// Check if dark mode is enabled
const isDarkMode = localStorage.getItem('darkMode') === 'true';

// Initialize dark mode state
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

// Handle dark mode toggle
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
    }
});
