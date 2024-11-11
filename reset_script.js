document.getElementById("resetPasswordForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Get the token from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
        alert("Invalid or missing token. Please check your email link.");
        return;
    }

    // Check if the passwords match
    if (newPassword !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    try {
        const response = await fetch('http://localhost:5500/reset_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, newPassword })
        });

        if (response.ok) {
            alert("Your password has been reset successfully.");
            window.location.href = "login.html";  // Redirect to login page
        } else {
            alert("Failed to reset password. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    }
});

