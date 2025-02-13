document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const forgotPasswordLink = document.querySelector('a[href="#"]');
    const socialLinks = document.querySelectorAll('.grid a[href="#"]');
    const signupLink = document.querySelector('a[href="#"]:last-child');

    // Form submit handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Simulate login (in real app, this would send to server)
        alert(`Login attempt for: ${email}\nPassword: ${'*'.repeat(password.length)}`);
        
        // Reset form
        loginForm.reset();
    });

    // Forgot password handler
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = prompt('Please enter your email to reset password:');
        if (email) {
            alert(`Password reset instructions will be sent to: ${email}`);
        }
    });

    // Social login handlers
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const provider = link.textContent.trim();
            alert(`Redirecting to ${provider} login...`);
        });
    });

    // Signup link handler
    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Redirecting to signup page...');
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});