// mobile-menu.js
function initializeMobileMenu() {
    const menuToggleButton = document.querySelector('.menu-toggle-button'); // Define button selector in your HTML
    const mobileMenu = document.querySelector('.mobile-menu'); // Define mobile menu selector in your HTML

    if (menuToggleButton && mobileMenu) {
        menuToggleButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active'); // Use CSS to show/hide the menu
        });
    }
}
