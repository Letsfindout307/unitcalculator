// Main JavaScript functionality for UniConvert

document.addEventListener('DOMContentLoaded', function() {
    // Initialize conversion functionality
    initializeConverter();
    
    // Initialize category switching
    initializeCategories();
    
    // Initialize swap button
    initializeSwapButton();
    
    // Initialize testimonial slider
    initializeTestimonialSlider();
});

// Conversion functionality
function initializeConverter() {
    const inputField = document.querySelector('.converter-input input');
    const outputField = document.querySelector('.converter-output input');
    const inputSelect = document.querySelector('.converter-input select');
    const outputSelect = document.querySelector('.converter-output select');
    const formulaText = document.querySelector('.conversion-formula');

    const lengthConversions = {
        meter: 1,
        kilometer: 0.001,
        centimeter: 100,
        millimeter: 1000,
        mile: 0.000621371,
        yard: 1.09361,
        foot: 3.28084,
        inch: 39.3701
    };

    function updateConversion() {
        const inputValue = parseFloat(inputField.value);
        const inputUnit = inputSelect.value;
        const outputUnit = outputSelect.value;

        if (!isNaN(inputValue)) {
            const baseValue = inputValue / lengthConversions[inputUnit];
            const outputValue = baseValue * lengthConversions[outputUnit];

            outputField.value = outputValue.toFixed(5);
            formulaText.textContent = `Formula: 1 ${inputUnit} = ${(lengthConversions[outputUnit] / lengthConversions[inputUnit]).toFixed(5)} ${outputUnit}`;
        }
    }

    inputField.addEventListener('input', updateConversion);
    inputSelect.addEventListener('change', updateConversion);
    outputSelect.addEventListener('change', updateConversion);
    
    updateConversion();
}

// Category switching functionality
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

// Update conversion options based on the selected category
function updateConversionOptions(category) {
    const inputSelect = document.querySelector('.converter-input select');
    const outputSelect = document.querySelector('.converter-output select');

    const options = {
        length: ['meter', 'kilometer', 'centimeter', 'millimeter', 'mile', 'yard', 'foot', 'inch'],
        weight: ['gram', 'kilogram', 'pound', 'ounce', 'ton'],
        volume: ['liter', 'milliliter', 'gallon', 'cup', 'pint']
    };

    inputSelect.innerHTML = '';
    outputSelect.innerHTML = '';

    options[category].forEach(unit => {
        inputSelect.innerHTML += `<option value="${unit">${unit}</        outputSelect += `<">${unit}</option>`;
       updateConversion Swap buttonButton()    const swapButton = document.querySelector('.swap-icon');
    const input.querySelector('.converter-input select');
    const outputSelect = document.querySelector('.converter-output select');
    
    swapButton.addEventListener('click', function() {
        = input inputSelect.value;
        output.value = input;
        update    });
}

//imonial slider functionality
function initializeTestimonialSlider() {
    const testimonialsAll('.testimonial');
    let currentIndex = 0    function showTestimonial(index {
        testimonialWidth = testimonials[0].offsetWidth;
        const scrollPosition = index * (testimonialWidth + 30);
        
        document.querySelector('.testimonial-slider').scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        currentIndex = index;
    }

    setInterval {
        currentIndex = (currentIndex + 1) % testimonials.length;
       imonial(currentIndex);
    }, 5000);
}
