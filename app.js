require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const expressLayouts = require('express-ejs-layouts');
const app = express();
require('dotenv').config(); // Load environment variables
const port = 3000;

// EJS setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('layout', 'layout');


app.use(express.urlencoded({ extended: true }));

// Email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Routes
app.get('/', (req, res) => res.render('home'));
app.get('/services', (req, res) => res.render('services'));
app.get('/aboutus', (req, res) => res.render('aboutus'));
app.get('/contact', (req, res) => res.render('contact'));
app.post('/contact', async (req, res) => {
    const nodemailer = require('nodemailer');
    
  // GoDaddy SMTP configuration
const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net', // GoDaddy's SMTP server
    port: 587, // SSL port
    secure: false, // true for 465, false for other ports
    auth: {
      user: "info@smarthandpainting.au",
      pass: "Boparainz1"
    }
    ,

    tls: {
      rejectUnauthorized: false // For local testing only (remove in production)
    }
  });
    
    // Example route for sending emails
      try {
        const { name, email, message } = req.body;
    
        const mailOptions = {
          from: `"Website Form" <${process.env.GODADDY_EMAIL}>`,
          to: process.env.ADMIN_EMAIL,
          subject: 'New Contact Form Submission',
          html: `
            <h3>New Contact Request</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
          `
        };
    
        await transporter.sendMail(mailOptions);
        res.redirect('/thank-you');
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending message');
      }
    
});

// app.listen(port, () => console.log(`Server running on port ${port}`));
// Start the server
app.listen(5555, "192.168.1.10", function () {
    console.log("Server Started");
});
// const PORT = process.env.PORT || 5555; // Use environment variable or default to 5555
// const HOST = process.env.HOST || '0.0.0.0'; // Use environment variable or default to '0.0.0.0'

// app.listen(PORT, HOST, function () {
//     console.log(`Server started on http://${HOST}:${PORT}`);
// }).on('error', (err) => {
//     console.error('Server failed to start:', err.message);
// });