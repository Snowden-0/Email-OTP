const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const users = {}; // In-memory storage for demonstration purposes

// Email setup
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Signup route
router.post('/signup', (req, res, next) => {
    const { username, password, email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    
    users[email] = { username, password, otp };
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Error sending email' });
        }
        res.status(200).json({ message: 'OTP sent' });
    });
});

// Verify OTP route
router.post('/verify', (req, res) => {
    const { email, otp } = req.body;
    const user = users[email];

    if (user && user.otp === otp) {
        delete users[email].otp; // OTP is valid, remove it
        res.status(200).json({ message: 'Signup successful' });
    } else {
        res.status(400).json({ error: 'Invalid OTP or email' });
    }
});

module.exports = router;
