// testimonial.js
let currentIndex = 0;

function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialWidth = testimonials[0].offsetWidth;
    const scrollPosition = index * (testimonialWidth + 30); // Adjust for gap

    document.querySelector('.testimonial-slider').scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

function initializeTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');

    setInterval(function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
}
