// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            // Reset animation
            item.style.animation = 'none';
            
            if (filterValue === 'all') {
                setTimeout(() => {
                    item.classList.remove('hide');
                    item.style.animation = 'fadeInScale 0.6s ease forwards';
                }, 10);
            } else {
                const itemCategory = item.getAttribute('data-category');
                if (itemCategory === filterValue) {
                    setTimeout(() => {
                        item.classList.remove('hide');
                        item.style.animation = 'fadeInScale 0.6s ease forwards';
                    }, 10);
                } else {
                    item.classList.add('hide');
                }
            }
        });
    });
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxVideo = document.getElementById('lightbox-video');
const closeLightbox = document.querySelector('.close-lightbox');

// Sample video URLs for demonstration (you can replace with actual video URLs)
const videoUrls = {
    'short-form': [
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'https://www.youtube.com/embed/dQw4w9WgXcQ'
    ],
    'long-form': [
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'https://www.youtube.com/embed/dQw4w9WgXcQ'
    ],
    'gaming': [
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'https://www.youtube.com/embed/dQw4w9WgXcQ'
    ],
    'football': [
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'https://www.youtube.com/embed/dQw4w9WgXcQ'
    ],
    'ecommerce': [
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'https://www.youtube.com/embed/dQw4w9WgXcQ'
    ],
    'documentary': [
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'https://www.youtube.com/embed/dQw4w9WgXcQ'
    ],
    'color-grading': [
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'https://www.youtube.com/embed/dQw4w9WgXcQ'
    ],
    'anime': [
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'https://www.youtube.com/embed/dQw4w9WgXcQ'
    ],
    'ads': [
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'https://www.youtube.com/embed/dQw4w9WgXcQ'
    ]
};

// Open lightbox when clicking portfolio item
portfolioItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const category = item.getAttribute('data-category');
        const categoryItems = document.querySelectorAll(`[data-category="${category}"]`);
        const itemIndex = Array.from(categoryItems).indexOf(item);
        
        // Get video URL (use actual URLs in production)
        const videoUrl = videoUrls[category] && videoUrls[category][itemIndex] 
            ? videoUrls[category][itemIndex] 
            : 'https://www.youtube.com/embed/dQw4w9WgXcQ';
        
        lightboxVideo.src = videoUrl;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close lightbox
closeLightbox.addEventListener('click', closeLightboxFunc);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightboxFunc();
    }
});

function closeLightboxFunc() {
    lightbox.classList.remove('active');
    lightboxVideo.src = '';
    document.body.style.overflow = 'auto';
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightboxFunc();
    }
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
    }

    lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and stats
document.querySelectorAll('.about, .portfolio, .contact, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;

    // Simple validation
    if (name && email && message) {
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 700);
    }
});

// Counter animation for stats
const counters = document.querySelectorAll('.stat-item h3');
const speed = 200; // Animation speed

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.innerText);
            let count = 0;
            const increment = target / speed;

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    counter.innerText = Math.ceil(count) + '+';
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target + '+';
                }
            };

            updateCount();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// Add hover effect sound (optional - requires audio files)
// Uncomment and add audio files if desired
/*
const hoverSound = new Audio('hover-sound.mp3');
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
});
*/

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('.portfolio-image img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add cursor trail effect (optional creative element)
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

if (circles.length === 0) {
    // Create cursor trail circles
    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.className = 'cursor-trail';
        document.body.appendChild(circle);
    }
}

// Performance optimization: Debounce resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate layouts if needed
        console.log('Window resized');
    }, 250);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

console.log('Editkaro.in Portfolio - Loaded Successfully ✨');
