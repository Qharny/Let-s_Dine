window.addEventListener('scroll', function () {
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

document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.food-slide');
    const priceElement = document.getElementById('number');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (!slides.length || !priceElement || !prevBtn || !nextBtn) {
        return;
    }
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
    document.addEventListener('keydown', function (e) {
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
    const slider = document.querySelector('.food-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopSlideshow);
        slider.addEventListener('mouseleave', startSlideshow);
    }

    // Start the slideshow when the page loads
    startSlideshow();
});


document.addEventListener('DOMContentLoaded', function () {
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

document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                newsletterForm.reset();
                alert('Thanks for subscribing!'); // Replace with custom toast if needed
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = document.body.dataset.page;
    if (!currentPage) return;

    const navLinks = document.querySelectorAll('nav a[data-page]');
    navLinks.forEach(link => {
        if (link.dataset.page === currentPage) {
            link.classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const authForms = document.querySelectorAll('.auth-form');

    authForms.forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const passwordInput = form.querySelector('input[name="password"]');
            const confirmInput = form.querySelector('input[name="confirm"]');

            if (passwordInput && confirmInput && passwordInput.value !== confirmInput.value) {
                alert('Passwords do not match. Please try again.');
                return;
            }

            const message = form.id === 'signup-form'
                ? 'Account created! Check your email to verify your profile.'
                : 'Welcome back! Redirecting to your dashboard.';

            alert(message);
            form.reset();
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