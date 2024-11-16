document.addEventListener("DOMContentLoaded", function () {
    // Reference to the form
    const form = document.querySelector(".needs-validation");
  
    // Listen for form submission
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the form from submitting
  
      // Clear previous warnings
      clearWarnings();
  
      // Validate required fields
      let isValid = true;
      const warnings = [];
  
      const firstName = document.getElementById("firstName");
      const lastName = document.getElementById("lastName");
      const username = document.getElementById("username");
      const address = document.getElementById("address");
      const country = document.getElementById("country");
      const state = document.getElementById("state");
      const zip = document.getElementById("zip");
  
      // Check if fields are empty
      if (firstName.value.trim() === "") {
        isValid = false;
        warnings.push("First name is required.");
        firstName.classList.add("is-invalid");
      }
  
      if (lastName.value.trim() === "") {
        isValid = false;
        warnings.push("Last name is required.");
        lastName.classList.add("is-invalid");
      }
  
      if (username.value.trim() === "") {
        isValid = false;
        warnings.push("Username is required.");
        username.classList.add("is-invalid");
      }
  
      if (address.value.trim() === "") {
        isValid = false;
        warnings.push("Address is required.");
        address.classList.add("is-invalid");
      }
  
      if (country.value === "") {
        isValid = false;
        warnings.push("Country selection is required.");
        country.classList.add("is-invalid");
      }
  
      if (state.value === "") {
        isValid = false;
        warnings.push("State selection is required.");
        state.classList.add("is-invalid");
      }
  
      if (zip.value.trim() === "") {
        isValid = false;
        warnings.push("Zip code is required.");
        zip.classList.add("is-invalid");
      }
  
      // Show warnings if there are invalid fields
      if (!isValid) {
        displayWarnings(warnings);
      } else {
        form.submit(); // Submit the form if all fields are valid
      }
    });
  
    function clearWarnings() {
      // Remove existing warning messages
      const warningContainer = document.querySelector(".warning-container");
      if (warningContainer) {
        warningContainer.remove();
      }
    }
  
    function displayWarnings(warnings) {
      // Create a container for warnings
      const warningContainer = document.createElement("div");
      warningContainer.classList.add("warning-container", "mt-3", "alert", "alert-warning");
  
      // Create a list of warnings
      warnings.forEach(warning => {
        const warningMessage = document.createElement("p");
        warningMessage.textContent = warning;
        warningContainer.appendChild(warningMessage);
      });
  
      // Append the warning container to the bottom of the form
      form.appendChild(warningContainer);
    }
  });
  