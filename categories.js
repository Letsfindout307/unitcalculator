// categories.js
const conversionOptions = {
    length: {
        meter: 1,
        kilometer: 0.001,
        centimeter: 100,
        millimeter: 1000,
        mile: 0.000621371,
        yard: 1.09361,
        foot: 3.28084,
        inch: 39.3701
    },
    weight: {
        gram: 1,
        kilogram: 0.001,
        pound: 0.00220462,
        ounce: 0.035274
    }
    // Add more categories as needed
};

function updateConversionOptions(category) {
    const inputSelect = document.querySelector('.converter-input select');
    const outputSelect = document.querySelector('.converter-output select');

    // Clear existing options
    inputSelect.innerHTML = '';
    outputSelect.innerHTML = '';

    // Populate with new options
    for (const unit in conversionOptions[category]) {
        inputSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
        outputSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
    }
}

function initializeCategories() {
    const categoryItems = document.querySelectorAll('.converter-categories li');

    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            categoryItems.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            updateConversionOptions(this.dataset.category);
        });
    });
}
