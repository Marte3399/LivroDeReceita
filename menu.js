// Menu toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.toggle-btn');
    const toggleIcon = toggleBtn.querySelector('i');

    // Toggle menu state
    function toggleMenu() {
        sidebar.classList.toggle('collapsed');
        toggleIcon.classList.toggle('fa-chevron-right');
        toggleIcon.classList.toggle('fa-chevron-left');
    }

    // Add click event listener
    toggleBtn.addEventListener('click', toggleMenu);

    // Load saved state
    const isCollapsed = localStorage.getItem('menuCollapsed') === 'true';
    if (isCollapsed) {
        sidebar.classList.add('collapsed');
        toggleIcon.classList.remove('fa-chevron-left');
        toggleIcon.classList.add('fa-chevron-right');
    }

    // Save state on change
    toggleBtn.addEventListener('click', () => {
        localStorage.setItem('menuCollapsed', sidebar.classList.contains('collapsed'));
    });
});
