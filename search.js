// search.js
function initializeSearchFunctionality() {
    document.querySelector('.search-box button').addEventListener('click', function() {
        const searchInput = document.querySelector('.search-box input');
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm) {
            alert(`Searching for: ${searchTerm}`); // Replace with actual search functionality
            searchInput.value = '';
        }
    });
}
