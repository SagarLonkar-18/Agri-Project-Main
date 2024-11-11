document.addEventListener("DOMContentLoaded", function () {
  // Define specific credentials
  const allowedEmail = "kaustubhlondhe021@gmail.com";
  const allowedPassword = "kaustubh0410";

  // Get the email and password input fields
  const emailInput = document.querySelector(
    'input[placeholder="Email address"]'
  );
  const passwordInput = document.querySelector('input[placeholder="Password"]');
  const submitButton = document.querySelector(".btn-primary");

  // Create feedback elements for email and password
  const emailFeedback = document.createElement("small");
  emailFeedback.classList.add("text-danger", "d-block", "email-feedback");
  emailInput.closest(".input-group").appendChild(emailFeedback); // Use closest('.input-group') to append below input

  const passwordFeedback = document.createElement("small");
  passwordFeedback.classList.add("text-danger", "d-block", "password-feedback");
  passwordInput.closest(".input-group").appendChild(passwordFeedback); // Use closest('.input-group') to append below input

  // Function to validate form input
  function validateForm() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let isValid = true;

    // Reset feedback messages
    emailFeedback.textContent = "";
    passwordFeedback.textContent = "";

    // Check if email is valid
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      emailFeedback.textContent = "Please enter a valid email address.";
      isValid = false;
    } else if (email.length > 50) {
      // Check character limit for email
      emailFeedback.textContent = "Email must be less than 50 characters.";
      isValid = false;
    }

    // Check if email and password are the same
    if (email === password) {
      passwordFeedback.textContent =
        "Password should not be the same as email.";
      isValid = false; // Set isValid to false
    }

    // Check character limit for password
    if (password.length > 50) {
      passwordFeedback.textContent =
        "Password must be less than 50 characters.";
      isValid = false; // Set isValid to false
    }

    // Password strength check (only if previous checks are passed)
    if (isValid) {
      // Check only if previous validations are passed
      if (password.length < 8) {
        passwordFeedback.textContent =
          "Weak Password. Password should be at least 8 characters.";
        passwordFeedback.classList.add("text-danger");
        passwordFeedback.classList.remove("text-success");
        isValid = false; // Set isValid to false
      } else if (password.length >= 15) {
        passwordFeedback.textContent = "Strong Password";
        passwordFeedback.classList.add("text-success");
        passwordFeedback.classList.remove("text-danger");
      } else if (password.length >= 8 && password.length < 15) {
        passwordFeedback.textContent = ""; // Clear any feedback if password is valid and medium strength
        passwordFeedback.classList.remove("text-danger", "text-success");
      }
    }

    // **Check specific credentials only if other validations pass**
    if (isValid) {
      if (email !== allowedEmail || password !== allowedPassword) {
        passwordFeedback.textContent = "Invalid email or password.";
        passwordFeedback.classList.add("text-danger");
        isValid = false;
      }
    }

    return isValid;
  }

  // Attach the validate function to the form submission
  submitButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission by default
    if (validateForm()) {
      window.location.href = "dashboard.html"; // Redirect to new page if validation passes
    }
  });
});
    