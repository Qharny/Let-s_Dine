window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const menuSection = document.querySelector('#menu');
    
    if (menuSection) {
        const menuPosition = menuSection.getBoundingClientRect().top;
        
        if (menuPosition <= header.offsetHeight) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.food-slide');
    const priceElement = document.getElementById('number');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let slideInterval; // Variable to store the interval
    const intervalTime = 3000; // Time in milliseconds (3 seconds)

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('active');
        
        // Update price
        const price = slides[index].querySelector('img').dataset.price;
        priceElement.textContent = `₵${price}`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Start automatic slideshow
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    // Stop automatic slideshow
    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        stopSlideshow(); // Stop auto sliding when user interacts
        nextSlide();
        startSlideshow(); // Restart auto sliding
    });

    prevBtn.addEventListener('click', () => {
        stopSlideshow(); // Stop auto sliding when user interacts
        prevSlide();
        startSlideshow(); // Restart auto sliding
    });

    // Optional: Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            stopSlideshow();
            prevSlide();
            startSlideshow();
        }
        if (e.key === 'ArrowRight') {
            stopSlideshow();
            nextSlide();
            startSlideshow();
        }
    });

    // Optional: Add touch support
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            stopSlideshow();
            nextSlide();
            startSlideshow();
        }
        if (touchEndX - touchStartX > 50) {
            stopSlideshow();
            prevSlide();
            startSlideshow();
        }
    });

    // Optional: Pause slideshow when hovering over the slider
    const slider = document.querySelector('.slider-container'); // Add this class to your slider's container
    if (slider) {
        slider.addEventListener('mouseenter', stopSlideshow);
        slider.addEventListener('mouseleave', startSlideshow);
    }

    // Start the slideshow when the page loads
    startSlideshow();
});


document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const shopItems = document.querySelectorAll('.shop-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            // Filter items
            shopItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove('active');
    }
});