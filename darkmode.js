// Check if dark mode is enabled
const isDarkMode = localStorage.getItem('darkMode') === 'true';

// Initialize dark mode state
if (isDarkMode) {
    document.body.classList.add('dark-mode');
}
