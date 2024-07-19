const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobRoutes');
const CareerSchemaData = require('./models/careerData');
const handlerData = require('./handlerData');
const nodeMailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 5000;

// Use CORS to allow cross-origin requests
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
mongoose.connect(process.env.DB)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/admin/jobpost', jobRoutes);
app.use('/admin/jobgetData', jobRoutes);
app.use('/admin/jobdataDelete', jobRoutes);
app.get('/admin/emplayeedata', handlerData.getemplayeeData);

// Job application form setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

const transportmail = nodeMailer.createTransport({
  service: 'gmail', // Changed from 'server' to 'service'
  auth: {
    user: 'msrinath6109@gmail.com',
    pass: 'zzcngcqzjuvwjagz'
  }
});

app.post('/submit', upload.single('resume'), (req, res) => {
  try {
    const { firstName, lastName, gender, dateOfBirth, email, number, address, street, city, zipCode, qualification, experience } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Construct the URL to access the uploaded file
    const resumeUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const careerData = new CareerSchemaData({
      firstName,
      lastName,
      gender,
      dateOfBirth,
      email,
      number,
      address,
      street,
      city,
      zipCode,
      qualification,
      experience,
      resume: resumeUrl
    });

    careerData.save()
      .then(() => {
        // Email content to admin
        const mailContent = {
          from: 'msrinath6109@gmail.com',
          to: 'msrinath6109@gmail.com', // Replace with admin's email address
          subject: 'New Job Application Received',
          text: `A new job application has been received from ${firstName} ${lastName}. \nEmail: ${email}\nResume: ${resumeUrl}` // adding the user from details
        };

        transportmail.sendMail(mailContent, (err, info) => {
          if (err) {
            console.error('Error sending email:', err);
            return res.status(500).json({ error: 'Failed to send email notification.' });
          } else {
            console.log('Email sent:', info.response);
            res.json({ message: 'Career data saved and email sent successfully!' });
          }
        });
      })
      .catch(err => res.status(400).json({ error: err.message }));
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
