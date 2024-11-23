// Get the dark mode toggle button
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Check if dark mode is enabled
const isDarkMode = localStorage.getItem('darkMode') === 'true';

// Initialize dark mode state
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    if (darkModeToggle) {
        darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
}

// Add click event listener to toggle dark mode
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        // Toggle dark mode class on body
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        const icon = darkModeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('darkMode', 'true');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('darkMode', 'false');
        }
    });
}
