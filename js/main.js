/**
 * Marlco Capital Insurance Agency - Main JavaScript
 * Core functionality for navigation, interactions, and animations
 */

// ========================================
// CONFIGURATION
// ========================================
const CONFIG = {
    // TODO: Replace with actual WhatsApp business number
    whatsappNumber: '254700000000', // Placeholder - update with actual number
    whatsappMessage: 'Hello Marlco Capital! I would like to inquire about insurance services.',
};

// ========================================
// NAVIGATION FUNCTIONALITY
// ========================================
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navbarMenu = document.querySelector('.navbar-menu');
        this.navbarToggle = document.querySelector('.navbar-toggle');
        this.navLinks = document.querySelectorAll('.navbar-menu a');

        this.init();
    }

    init() {
        // Mobile menu toggle
        if (this.navbarToggle) {
            this.navbarToggle.addEventListener('click', () => this.toggleMenu());
        }

        // Close menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Highlight active page
        this.highlightActivePage();

        // Hide navbar on scroll down, show on scroll up
        this.initScrollBehavior();
    }

    toggleMenu() {
        this.navbarMenu.classList.toggle('active');

        // Animate hamburger icon
        const spans = this.navbarToggle.querySelectorAll('span');
        if (this.navbarMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    }

    closeMenu() {
        this.navbarMenu.classList.remove('active');
        const spans = this.navbarToggle?.querySelectorAll('span');
        spans?.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
        });
    }

    highlightActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        this.navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    initScrollBehavior() {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll <= 0) {
                this.navbar.style.transform = 'translateY(0)';
                return;
            }

            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling down
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                this.navbar.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        });
    }
}

// ========================================
// WHATSAPP INTEGRATION
// ========================================
class WhatsAppChat {
    constructor() {
        this.init();
    }

    init() {
        const whatsappButton = document.querySelector('.whatsapp-float');
        if (whatsappButton) {
            const message = encodeURIComponent(CONFIG.whatsappMessage);
            whatsappButton.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;

            // Add pulse animation
            this.addPulseAnimation(whatsappButton);
        }
    }

    addPulseAnimation(button) {
        // Create pulse effect every 3 seconds
        setInterval(() => {
            button.style.animation = 'pulse 0.6s';
            setTimeout(() => {
                button.style.animation = '';
            }, 600);
        }, 3000);
    }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.init();
    }

    init() {
        // Create Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);

        // Observe elements with animation classes
        const elementsToAnimate = document.querySelectorAll('.card, .grid > *, .hero-content');
        elementsToAnimate.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
class ScrollToTop {
    constructor() {
        this.createButton();
        this.init();
    }

    createButton() {
        const button = document.createElement('button');
        button.className = 'scroll-to-top';
        button.innerHTML = '↑';
        button.setAttribute('aria-label', 'Scroll to top');
        button.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 24px;
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
      color: white;
      border: none;
      border-radius: 50%;
      font-size: 24px;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
      box-shadow: var(--shadow-lg);
    `;

        document.body.appendChild(button);
        this.button = button;
    }

    init() {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                this.button.style.opacity = '1';
                this.button.style.visibility = 'visible';
            } else {
                this.button.style.opacity = '0';
                this.button.style.visibility = 'hidden';
            }
        });

        // Scroll to top on click
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effect
        this.button.addEventListener('mouseenter', () => {
            this.button.style.transform = 'scale(1.1)';
        });

        this.button.addEventListener('mouseleave', () => {
            this.button.style.transform = 'scale(1)';
        });
    }
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ========================================
// INITIALIZE ON DOM LOAD
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    new Navigation();
    new WhatsAppChat();
    new ScrollAnimations();
    new ScrollToTop();
    initSmoothScroll();

    // Add pulse animation keyframes
    const style = document.createElement('style');
    style.textContent = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.15); }
    }
    
    .fade-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
    document.head.appendChild(style);
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Format phone number for display
 */
function formatPhoneNumber(number) {
    return number.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3 $4');
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
