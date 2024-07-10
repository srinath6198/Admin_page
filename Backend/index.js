const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobRoutes'); 
const CareerSchemaData = require('./models/careerData');
const handlerData = require('./handlerData')

const app = express();
const port = process.env.PORT || 5000;

// Use CORS to allow cross-origin requests
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); 
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
app.post('/submit', upload.single('resume'), (req, res) => {
  const { firstName, lastName, gender, dateOfBirth, email, number, address, street, city, zipCode, qualification, experience } = req.body;
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const resume = req.file.path;
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
    resume
  });
  careerData.save()
    .then(() => res.send('Career data saved successfully!'))
    .catch(err => res.status(400).send(err.message));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
