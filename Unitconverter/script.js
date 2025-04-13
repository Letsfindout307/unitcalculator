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

// Conversion functionality
function initializeConverter() {
    const inputField = document.querySelector('.converter-input input');
    const outputField = document.querySelector('.converter-output input');
    const inputSelect = document.querySelector('.converter-input select');
    const outputSelect = document.querySelector('.converter-output select');
    const formulaText = document.querySelector('.conversion-formula p');
    
    // Conversion rates for length units (relative to meters)
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
    
    // Function to update the conversion
    function updateConversion() {
        const inputValue = parseFloat(inputField.value);
        const inputUnit = inputSelect.value;
        const outputUnit = outputSelect.value;
        
        if (!isNaN(inputValue)) {
            // Convert input to base unit (meters)
            const baseValue = inputValue / lengthConversions[inputUnit];
            
            // Convert base unit to output unit
            const outputValue = baseValue * lengthConversions[outputUnit];
            
            // Update output field
            outputField.value = outputValue.toFixed(5);
            
            // Update formula text
            formulaText.textContent = `Formula: 1 ${inputUnit} = ${(lengthConversions[outputUnit] / lengthConversions[inputUnit]).toFixed(5)} ${outputUnit}`;
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
            
            // In a real implementation, this would load the appropriate conversion options
            // For demo purposes, we'll just show an alert
            if (this.dataset.category !== 'length') {
                alert(`${this.textContent} conversions will be available in the full version.`);
            }
        });
    });
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
        const event = new Event('change');
        inputSelect.dispatchEvent(event);
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
        // In a real implementation, this would search through available conversions
        // For demo purposes, we'll just show an alert
        alert(`Searching for: ${searchTerm}`);
        searchInput.value = '';
    }
});

// Premium button functionality
document.querySelectorAll('.premium-btn, .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // In a real implementation, this would open a signup/payment page
        // For demo purposes, we'll just show an alert
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
