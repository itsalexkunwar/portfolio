// Minimalist JavaScript functionality for Alex Kunwar's portfolio
// Clean, professional interactions with SIEM interface aesthetic

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initScrollAnimations();
    initFormValidation();
    initContactForm();
    initStatusIndicator();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Scroll Animations - Minimalist approach
function initScrollAnimations() {
    // Animate elements on scroll with subtle fade-in effects
    const animateElements = document.querySelectorAll('.contact-card, .cv-section, .skill-badge');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Subtle fade-in animation
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 600,
                    delay: index * 100,
                    easing: 'easeOutQuad'
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// Form Validation - Professional implementation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
        
        form.addEventListener('submit', handleFormSubmit);
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Clear previous errors
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        showFieldError(field, 'This field is required');
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            showFieldError(field, 'Please enter a valid email address');
        }
    }
    
    // Phone validation (basic)
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            isValid = false;
            showFieldError(field, 'Please enter a valid phone number');
        }
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('border-red-500');
    
    // Create or update error message
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error text-red-400 text-xs mt-1';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearFieldError(field) {
    field.classList.remove('border-red-500');
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const inputs = form.querySelectorAll('input, textarea, select');
    let isFormValid = true;
    
    // Validate all fields
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    if (isFormValid) {
        submitForm(form);
    }
}

// Contact Form Submission
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Enhanced form validation and submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const form = this;
            const submitBtn = form.querySelector('button[type="submit"]');
            const messagesDiv = document.getElementById('form-messages');
            
            // Disable submit button and show loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';
            
            // Simulate form submission with professional delay
            setTimeout(() => {
                // Show success message
                showFormMessage('Thank you for your message! I will get back to you within 24 hours.', 'success');
                
                // Reset form
                form.reset();
                
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message';
                
                // Remove any error styling
                const fields = form.querySelectorAll('input, textarea, select');
                fields.forEach(field => {
                    field.classList.remove('border-red-500');
                });
                
            }, 2000);
        });
    }
}

function submitForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    
    // Simulate API call
    setTimeout(() => {
        showFormMessage('Thank you for your message! I will get back to you within 24 hours.', 'success');
        form.reset();
        
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }, 1500);
}

function showFormMessage(message, type) {
    const messagesDiv = document.getElementById('form-messages');
    if (!messagesDiv) return;
    
    messagesDiv.className = `${type}-message p-4 rounded-lg mb-4`;
    messagesDiv.innerHTML = `
        <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                ${type === 'success' ? 
                    '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>' :
                    '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>'
                }
            </svg>
            ${message}
        </div>
    `;
    
    // Scroll to message
    messagesDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        messagesDiv.className = 'hidden';
    }, 5000);
}

// Status Indicator Animation
function initStatusIndicator() {
    const indicators = document.querySelectorAll('.status-indicator');
    
    indicators.forEach(indicator => {
        // Add subtle hover effect
        indicator.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: [1, 1.2],
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        indicator.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: [1.2, 1],
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Smooth scrolling for anchor links
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

// Navigation active state management
function updateActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        const href = tab.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

// Initialize navigation on page load
updateActiveNavigation();

// CV Download functionality
function downloadCV() {
    // Create a simple text file as placeholder
    const cvContent = `
Alex Kunwar - Security Analyst
=============================

Contact Information:
Email: alex@alexkunwar.com
Phone: +44 7308 351236
Location: Edinburgh, UK

Professional Summary:
Security Analyst with expertise in vulnerability management, 
threat detection, and cybersecurity consulting. Proven track 
record of reducing organizational vulnerability scores by 40% 
and resolving 500+ technical issues.

Key Skills:
- Vulnerability Management (95%)
- Threat Detection & Response (90%)
- Security Policy Development (88%)
- Incident Response (85%)

Current Position:
Security Analyst at Retail Energy Code Company
July 2024 - Present | London, UK (Remote)

Education:
BEng Cybersecurity & Forensics (First Class Honours)
Edinburgh Napier University | 2022-2025

For full CV, please contact: alex@alexkunwar.com
    `.trim();
    
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Alex_Kunwar_CV_Summary.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Show notification
    showNotification('CV summary downloaded. Contact for full PDF version.', 'info');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 p-4 rounded-lg z-50 max-w-sm ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        type === 'info' ? 'bg-blue-500 text-white' :
        'bg-gray-500 text-white'
    }`;
    notification.innerHTML = `
        <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                ${type === 'success' ? 
                    '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>' :
                    '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>'
                }
            </svg>
            ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                notification.remove();
            }
        });
    }, 4000);
}

// Console message for developers
console.log('%c🔒 Alex Kunwar - Cybersecurity Professional', 'color: #4a90e2; font-size: 16px; font-weight: bold;');
console.log('%cPortfolio built with security-first principles and minimalist design', 'color: #6c757d; font-size: 14px;');
console.log('%cContact: alex@alexkunwar.com | https://7urcwqoatd62o.ok.kimi.link', 'color: #28a745; font-size: 12px;');

// Utility functions
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

// Performance optimization
window.addEventListener('load', function() {
    // Remove loading states if any
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(element => {
        element.classList.remove('loading');
    });
});

// Export functions for global access
window.portfolioJS = {
    showNotification,
    downloadCV,
    showFormMessage
};