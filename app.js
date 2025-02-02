require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;
require('dotenv').config();
const nodemailer = require("nodemailer");

// EJS setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('layout', 'layout');


app.use(express.urlencoded({ extended: true }));

// Gmail SMTP Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
  }
});

// Routes
app.get('/', (req, res) => res.render('home'));
app.get('/services', (req, res) => res.render('services'));
app.get('/aboutus', (req, res) => res.render('aboutus'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/thank-you', (req, res) => res.render('thank-you'));
app.post('/contact', async (req, res) => {
    
  // Gmail SMTP configuration
  try {
    const { name, email, phone, message } = req.body;

    // Send email
    await transporter.sendMail({
        from: `"Website Contact Form" <${process.env.GMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Contact Form Submission',
        html: `
            <h2>New Contact Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>`
    });
    res.redirect('/thank-you');
} catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error submitting form');
} 
});

// Start the server
// app.listen(5555, "192.168.1.10", function () {
//     console.log("Server Started");
// });
const PORT = process.env.PORT || 5555; // Use environment variable or default to 5555
const HOST = process.env.HOST || '0.0.0.0'; // Use environment variable or default to '0.0.0.0'

app.listen(PORT, HOST, function () {
    console.log(`Server started on http://${HOST}:${PORT}`);
}).on('error', (err) => {
    console.error('Server failed to start:', err.message);
});