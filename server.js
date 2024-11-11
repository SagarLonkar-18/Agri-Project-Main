const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5500;
const cors = require('cors');
const crypto = require('crypto');

app.set("view engine", "ejs");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Enable form data parsing

const resetTokens = {}; // Temporary in-memory store (use database in production)

// Serve static files (e.g., styles.css)
app.use(express.static('public'));

// Email sending endpoint
app.post('/send-email', (req, res) => {
    const { email } = req.body;

    const resetToken = crypto.randomBytes(32).toString('hex');
    resetTokens[email] = resetToken;  // Store the token associated with the email
    console.log("Generated reset token for email:", email, "Token:", resetToken); // Debug log

    // Set up the transporter for sending the email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'saieshborse31@gmail.com', // Change to your email
            pass: 'btnr bcba pvhc ouwx' // Use app-specific password
        }
    });

    // Email options with updated reset link
    const mailOptions = {
        from: 'saieshborse31@gmail.com', 
        to: email,
        subject: 'Password Reset Link',
        text: `Please click the link below to reset your password:\n\nhttp://localhost:5500/reset-password?token=${resetToken}&email=${email}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Failed to send email.');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Password reset link has been sent.');
    });
});

// For rendering login file
app.get("/login", (req, res) => {
    res.render("login"); // Ensure 'login.ejs' is in the views folder
});

// Route to render reset password page with token and email
app.get('/reset-password', (req, res) => {
    const { token, email } = req.query;

    // Check if token exists for the provided email
    if (resetTokens[email] !== token) {
        return res.status(400).send("Invalid or expired token.");
    }

    // Render reset_password.ejs and pass the token and email to it
    res.render("reset_password", { token, email });
});

// Handle password reset form submission
app.post('/reset-password', (req, res) => {
    const { token, email, newPassword } = req.body;
    console.log("Received token from form:", token); // Debug log
    console.log("Stored token for email:", resetTokens[email]); // Debug log

    // Find the email associated with the token
    if (resetTokens[email] !== token) {
        return res.status(400).send("Invalid or expired token.");
    }

    // In a real application, hash the password and store it in your DB
    console.log(`Password for ${email} has been updated.`);

    // Remove the token after use (to prevent reusing the reset link)
    delete resetTokens[email];

    res.render("postReset")
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
