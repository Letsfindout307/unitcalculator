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
    
    // Initialize premium calculator cards
    initializePremiumCards();
});

// Conversion rates
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
        ounce: 0.035274,
        ton: 0.000001
    },
    volume: {
        liter: 1,
        milliliter: 1000,
        gallon: 0.264172,
        cup: 4.22675,
        pint: 2.11338
    },
    temperature: {
        celsius: (val) => val,
        fahrenheit: (val) => (val - 32) * 5 / 9,
        kelvin: (val) => val - 273.15
    },
    area: {
        squareMeter: 1,
        squareKilometer: 0.000001,
        hectare: 0.0001,
        acre: 0.000247105,
        squareFoot: 10.7639,
        squareYard: 1.19599
    },
    speed: {
        meterPerSecond: 1,
        kilometerPerHour: 3.6,
        milePerHour: 2.23694,
        feetPerSecond: 3.28084
    }
};

// Conversion function to convert between units
function convertValue(value, inputUnit, outputUnit) {
    const category = getCategory(inputUnit);
    let baseValue;

    // For temperature conversion
    if (category === 'temperature') {
        baseValue = conversionOptions.temperature[inputUnit](value); // Convert to Celsius
        return convertTemperature(baseValue, outputUnit); // Convert from Celsius to the desired unit
    }

    // Convert input value to base
    baseValue = value / conversionOptions[category][inputUnit];

    // Convert base value to output unit
    return baseValue * conversionOptions[category][outputUnit];
}

// Get category based on the input unit
function getCategory(unit) {
    for (const category in conversionOptions) {
        if (conversionOptions[category][unit]) {
            return category;
        }
    }
    return null;
}

// Handle temperature conversion
function convertTemperature(value, outputUnit) {
    if (outputUnit === 'celsius') {
        return value; // Already in Celsius
    } else if (outputUnit === 'fahrenheit') {
        return (value * 9 / 5) + 32; // Convert to Fahrenheit
    } else if (outputUnit === 'kelvin') {
        return value + 273.15; // Convert to Kelvin
    }
}

// Conversion functionality
function initializeConverter() {
    const inputField = document.querySelector('.converter-input input');
    const outputField = document.querySelector('.converter-output input');
    const inputSelect = document.querySelector('.converter-input select');
    const outputSelect = document.querySelector('.converter-output select');
    const formulaText = document.querySelector('.conversion-formula p');

    // Function to update the conversion
    function updateConversion() {
        const inputValue = parseFloat(inputField.value);
        const inputUnit = inputSelect.value;
        const outputUnit = outputSelect.value;

        if (!isNaN(inputValue)) {
            const convertedValue = convertValue(inputValue, inputUnit, outputUnit);
            outputField.value = convertedValue.toFixed(5);

            // Display formula
            formulaText.textContent = `1 ${inputUnit} = ${(conversionOptions[getCategory(inputUnit)][outputUnit] / conversionOptions[getCategory(inputUnit)][inputUnit]).toFixed(5)} ${outputUnit}`;
        }
    }

    // Add event listeners
    inputField.addEventListener('input', updateConversion);
    inputSelect.addEventListener('change', updateConversion);
    outputSelect.addEventListener('change', updateConversion);
    
    // Initial conversion
    updateConversion();
}

// Category switching functionality
function initializeCategories() {
    const categoryItems = document.querySelectorAll('.converter-categories li');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            categoryItems.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Update conversion options based on selected category
            updateConversionOptions(this.dataset.category);
        });
    });
}

// Function to update conversion options
function updateConversionOptions(category) {
    const inputSelect = document.querySelector('.converter-input select');
    const outputSelect = document.querySelector('.converter-output select');

    inputSelect.innerHTML = '';
    outputSelect.innerHTML = '';

    for (const unit in conversionOptions[category]) {
        inputSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
        outputSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
    }

    // Call updateConversion to perform the initial conversion
    updateConversion();
}

// Swap button functionality
function initializeSwapButton() {
    const swapButton = document.querySelector('.swap-icon');
    const inputSelect = document.querySelector('.converter-input select');
    const outputSelect = document.querySelector('.converter-output select');
    
    swapButton.addEventListener('click', function() {
        // Get current values
        const inputValue = inputSelect.value;
        const outputValue = outputSelect.value;
        
        // Swap values
        inputSelect.value = outputValue;
        outputSelect.value = inputValue;
        
        // Trigger conversion update
        updateConversion();
    });
}

// Testimonial slider functionality
function initializeTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentIndex = 0;
    
    // Function to show testimonial at index
    function showTestimonial(index) {
        // Calculate the scroll position
        const testimonialWidth = testimonials[0].offsetWidth;
        const scrollPosition = index * (testimonialWidth + 30); // 30px is the gap
        
        // Scroll to the position
        document.querySelector('.testimonial-slider').scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        currentIndex = index;
    }
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
}

// Premium calculator cards functionality
function initializePremiumCards() {
    const premiumCards = document.querySelectorAll('.premium-card');
    
    premiumCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll to premium section
            document.getElementById('premium').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Search functionality
document.querySelector('.search-box button').addEventListener('click', function() {
    const searchInput = document.querySelector('.search-box input');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm) {
        // Implement search logic here if required
        alert(`Searching for: ${searchTerm}`);
        searchInput.value = '';
    }
});

// Premium button functionality
document.querySelectorAll('.premium-btn, .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Show premium signup alert
        alert('This would open the premium signup page in the full version.');
    });
});

// Newsletter subscription
document.querySelector('.newsletter-form button').addEventListener('click', function(e) {
    e.preventDefault();
    const emailInput = document.querySelector('.newsletter-form input');
    const email = emailInput.value.trim();
    
    if (email && validateEmail(email)) {
        alert(`Thank you for subscribing with: ${email}`);
        emailInput.value = '';
    } else {
        alert('Please enter a valid email address.');
    }
});

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Mobile menu toggle (for responsive design)
document.addEventListener('DOMContentLoaded', function() {
    // This would be implemented in a real site with a hamburger menu
    // For this demo, we're keeping the navigation simple
});

// Scroll to section when nav links are clicked
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId.startsWith('#') && targetId.length > 1) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});
