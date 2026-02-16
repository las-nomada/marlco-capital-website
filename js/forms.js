/**
 * Marlco Capital Insurance Agency - Form Handling & Validation
 * Quote forms, contact forms, and validation logic
 */

// ========================================
// FORM CONFIGURATION
// ========================================
const FORM_CONFIG = {
    // TODO: Replace with actual email or form service endpoint
    submitEmail: 'info@marlocapital.co.ke', // Placeholder
    formspreeEndpoint: '', // Add FormSpree or similar service endpoint if needed
};

// ========================================
// FORM VALIDATOR
// ========================================
class FormValidator {
    constructor(form) {
        this.form = form;
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation on blur
        const inputs = this.form.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');

        // Clear previous error
        this.clearError(field);

        // Check if required field is empty
        if (required && !value) {
            this.showError(field, 'This field is required');
            return false;
        }

        // Validate email
        if (type === 'email' && value) {
            if (!this.isValidEmail(value)) {
                this.showError(field, 'Please enter a valid email address');
                return false;
            }
        }

        // Validate phone
        if (field.name === 'phone' && value) {
            if (!this.isValidPhone(value)) {
                this.showError(field, 'Please enter a valid phone number (10 digits)');
                return false;
            }
        }

        return true;
    }

    validateForm() {
        let isValid = true;
        const inputs = this.form.querySelectorAll('.form-control');

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    showError(field, message) {
        field.classList.add('error');

        let errorDiv = field.parentElement.querySelector('.form-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            field.parentElement.appendChild(errorDiv);
        }

        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    clearError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentElement.querySelector('.form-error');
        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    isValidPhone(phone) {
        // Accept 10 digits with optional +254 prefix
        return /^(\+?254|0)?[17]\d{8}$/.test(phone.replace(/\s/g, ''));
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate form
        if (!this.validateForm()) {
            this.showNotification('Please fix the errors before submitting', 'error');
            return;
        }

        // Collect form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        try {
            // Submit form
            await this.submitForm(data);

            // Show success message
            this.showNotification('Thank you! We will contact you shortly.', 'success');

            // Reset form
            this.form.reset();

            // Track conversion (if analytics is set up)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    'event_category': 'engagement',
                    'event_label': this.form.id || 'form'
                });
            }

        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Something went wrong. Please try again or contact us directly.', 'error');
        } finally {
            // Restore button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    async submitForm(data) {
        // For now, log to console (in production, this would send to server/CRM)
        console.log('Form submitted:', data);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // TODO: Implement actual form submission
        // Option 1: Use FormSpree or similar service
        // Option 2: Send to your backend API
        // Option 3: Use mailto (not recommended for production)

        return { success: true };
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 24px;
      background: ${type === 'success' ? 'var(--color-success)' : type === 'error' ? 'var(--color-error)' : 'var(--color-info)'};
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: var(--shadow-xl);
      z-index: 9999;
      animation: slideIn 0.3s ease;
      max-width: 400px;
    `;

        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);

        // Add animation styles if not already present
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(400px); opacity: 0; }
        }
      `;
            document.head.appendChild(style);
        }
    }
}

// ========================================
// MULTI-STEP FORM HANDLER
// ========================================
class MultiStepForm {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (!this.form) return;

        this.steps = this.form.querySelectorAll('.form-step');
        this.currentStep = 0;
        this.init();
    }

    init() {
        this.updateProgress();
        this.attachNavigationListeners();
    }

    attachNavigationListeners() {
        // Next buttons
        this.form.querySelectorAll('.btn-next').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.validateCurrentStep()) {
                    this.nextStep();
                }
            });
        });

        // Previous buttons
        this.form.querySelectorAll('.btn-prev').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.prevStep();
            });
        });
    }

    validateCurrentStep() {
        const currentStepElement = this.steps[this.currentStep];
        const inputs = currentStepElement.querySelectorAll('.form-control[required]');
        let isValid = true;

        inputs.forEach(input => {
            const validator = new FormValidator(this.form);
            if (!validator.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.steps[this.currentStep].classList.remove('active');
            this.currentStep++;
            this.steps[this.currentStep].classList.add('active');
            this.updateProgress();
            this.scrollToTop();
        }
    }

    prevStep() {
        if (this.currentStep > 0) {
            this.steps[this.currentStep].classList.remove('active');
            this.currentStep--;
            this.steps[this.currentStep].classList.add('active');
            this.updateProgress();
            this.scrollToTop();
        }
    }

    updateProgress() {
        const progressBar = this.form.querySelector('.progress-bar');
        if (progressBar) {
            const progress = ((this.currentStep + 1) / this.steps.length) * 100;
            progressBar.style.width = `${progress}%`;
        }

        const stepIndicator = this.form.querySelector('.step-indicator');
        if (stepIndicator) {
            stepIndicator.textContent = `Step ${this.currentStep + 1} of ${this.steps.length}`;
        }
    }

    scrollToTop() {
        this.form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ========================================
// INITIALIZE FORMS ON DOM LOAD
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all forms with validation
    document.querySelectorAll('form').forEach(form => {
        new FormValidator(form);
    });
});
