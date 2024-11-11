// Selecting the input fields and button
const emailInput = document.querySelector('input[placeholder="Email address"]');
const passwordInput = document.querySelector('input[placeholder="Password"]');
const confirmPasswordInput = document.querySelector('input[placeholder="Confirm Password"]');
const phoneInput = document.querySelector('input[placeholder="Phone Number"]');
const submitButton = document.querySelector('.btn-primary');
const form = document.getElementById('signupForm'); // Select the form element

// Function to create feedback elements
function createFeedbackElement(inputElement) {
    const feedback = document.createElement('small');
    feedback.classList.add('text-danger', 'd-block');
    inputElement.closest('.input-group').appendChild(feedback);
    return feedback;
}

// Create feedback elements for each input field
const emailFeedback = createFeedbackElement(emailInput);
const passwordFeedback = createFeedbackElement(passwordInput);
const confirmPasswordFeedback = createFeedbackElement(confirmPasswordInput);
const phoneFeedback = createFeedbackElement(phoneInput);

// Function to validate form input
function validateForm() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    const phone = phoneInput.value.trim();

    let isValid = true;

    // Reset feedback messages
    emailFeedback.textContent = "";
    passwordFeedback.textContent = "";
    confirmPasswordFeedback.textContent = "";
    phoneFeedback.textContent = "";

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        emailFeedback.textContent = "Email is required.";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        emailFeedback.textContent = "Please enter a valid email address.";
        isValid = false;
    } else if (email.length > 50) {
        emailFeedback.textContent = "Email must be less than 50 characters.";
        isValid = false;
    }

    // Password validation
    if (!password) {
        passwordFeedback.textContent = "Password is required.";
        isValid = false;
    } else if (password === email) {
        passwordFeedback.textContent = "Password cannot be the same as email.";
        isValid = false;
    } else if (password.length < 8) {
        passwordFeedback.textContent = "Password should be at least 8 characters long.";
        isValid = false;
    } else if (password.length > 50) {
        passwordFeedback.textContent = "Password must be less than 50 characters.";
        isValid = false;
    }

    // Confirm password validation
    if (!confirmPassword) {
        confirmPasswordFeedback.textContent = "Confirm Password is required.";
        isValid = false;
    } else if (confirmPassword !== password) {
        confirmPasswordFeedback.textContent = "Passwords do not match.";
        isValid = false;
    }

    // Phone number validation
    const phonePattern = /^\d+$/;
    if (!phone) {
        phoneFeedback.textContent = "Phone number is required.";
        isValid = false;
    } else if (!phonePattern.test(phone)) {
        phoneFeedback.textContent = "Phone number should contain only numbers.";
        isValid = false;
    } else if (phone.length < 10 || phone.length > 15) {
        phoneFeedback.textContent = "Phone number should be between 10 and 15 digits.";
        isValid = false;
    }

    return isValid;
}

// Attach the validate function to the form submission
form.addEventListener('submit', function(event) {
    if (!validateForm()) {
        event.preventDefault(); // Prevent form submission if validation fails
    }
});
