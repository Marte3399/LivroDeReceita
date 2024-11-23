// Menu mobile toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const nav = document.querySelector('nav');

    // Toggle menu on hamburger click
    hamburgerMenu.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = nav.contains(event.target) || hamburgerMenu.contains(event.target);
        
        if (!isClickInside && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });

    // Close menu when clicking on a menu item
    const menuItems = document.querySelectorAll('nav a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
            }
        });
    });
});

// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check for saved dark mode preference
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') {
    body.classList.add('dark-mode');
    updateDarkModeIcon();
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    updateDarkModeIcon();
    
    // Save preference
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', null);
    }
});

// Update dark mode icon
function updateDarkModeIcon() {
    const icon = darkModeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}
