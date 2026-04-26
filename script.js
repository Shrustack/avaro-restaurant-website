// ==================== MOBILE MENU TOGGLE ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==================== MODAL FUNCTIONALITY ====================
const bookingModal = document.getElementById('booking-modal');
const closeModal = document.querySelector('.close-modal');

// Open modal when "Book Your Table" button is clicked
document.addEventListener('click', (e) => {
    if (e.target.textContent.includes('Book Your Table') || e.target.textContent.includes('Book Now')) {
        bookingModal.style.display = 'flex';
    }
});

// Close modal
closeModal.addEventListener('click', () => {
    bookingModal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        bookingModal.style.display = 'none';
    }
});

// ==================== FORM VALIDATION ====================
const contactForm = document.getElementById('contact-form');
const bookingForm = document.getElementById('booking-form');

// Contact form validation
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !phone || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }

        if (!isValidPhone(phone)) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }

        // Simulate form submission
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Booking form validation
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs = bookingForm.querySelectorAll('input, select, textarea');
        let allValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                allValid = false;
            }
        });

        if (!allValid) {
            showNotification('Please fill in all booking details', 'error');
            return;
        }

        showNotification('Booking confirmed! Check your email for confirmation details.', 'success');
        bookingForm.reset();
        bookingModal.style.display = 'none';
    });
}

// ==================== EMAIL VALIDATION ====================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== PHONE VALIDATION ====================
function isValidPhone(phone) {
    // Accepts international format or just digits
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== ACTIVE NAV LINK ON SCROLL ====================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== NAVBAR BACKGROUND ON SCROLL ====================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 248, 243, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(255, 107, 53, 0.15)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 248, 243, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(255, 107, 53, 0.1)';
    }
});

// ==================== HERO PARALLAX EFFECT ====================
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 30;
        const y = (e.clientY - window.innerHeight / 2) / 30;
        heroSection.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
    });

    heroSection.addEventListener('mouseleave', () => {
        heroSection.style.backgroundPosition = 'center';
    });
}

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe menu cards, testimonials, and other elements for animation
document.querySelectorAll('.menu-card, .testimonial-card, .offer-card, .gallery-slide, .choose-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== CAROUSEL SCROLLING ====================
function initCarousel(carouselEl, prevBtn, nextBtn, interval = 5000) {
    if (!carouselEl) return;

    const slideAmount = Math.min(carouselEl.clientWidth * 0.88, 500);

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            carouselEl.scrollBy({ left: -slideAmount, behavior: 'smooth' });
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            carouselEl.scrollBy({ left: slideAmount, behavior: 'smooth' });
        });
    }

    let autoScroll = null;

    const startAutoScroll = () => {
        clearInterval(autoScroll);
        autoScroll = setInterval(() => {
            if (carouselEl.scrollWidth - carouselEl.scrollLeft <= carouselEl.clientWidth + 10) {
                carouselEl.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carouselEl.scrollBy({ left: slideAmount, behavior: 'smooth' });
            }
        }, interval);
    };

    const stopAutoScroll = () => clearInterval(autoScroll);

    startAutoScroll();
    carouselEl.addEventListener('mouseenter', stopAutoScroll);
    carouselEl.addEventListener('mouseleave', startAutoScroll);
}

initCarousel(document.querySelector('.gallery-slider'), document.querySelector('.gallery-prev'), document.querySelector('.gallery-next'), 5000);
initCarousel(document.querySelector('.choose-carousel'), null, null, 4500);
initCarousel(document.querySelector('.testimonial-carousel'), document.querySelector('.testimonial-prev'), document.querySelector('.testimonial-next'), 5200);
initCarousel(document.querySelector('.offers-carousel'), null, null, 4700);

// ==================== GALLERY LIGHTBOX (OPTIONAL ENHANCEMENT) ====================
document.querySelectorAll('.gallery-slide').forEach(item => {
    item.addEventListener('click', function() {
        // Optional gallery lightbox can be added here
        console.log('Gallery item clicked');
    });
});

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Avaro Restaurant Website Loaded');
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // ESC key closes modal
        if (e.key === 'Escape') {
            bookingModal.style.display = 'none';
            navMenu.classList.remove('active');
        }
    });
});

// ==================== UTILITY: Add CSS Animation ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }

    .nav-link.active {
        color: var(--accent-gold);
    }

    .nav-link.active:after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ==================== SERVICE WORKER (OPTIONAL) ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('sw.js');
    });
}
