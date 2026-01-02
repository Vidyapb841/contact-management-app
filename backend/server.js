const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/contactDB';

mongoose.connect(mongoURI)  // NO options needed in Mongoose 7+
    .then(() => console.log(`MongoDB Connected: ${mongoURI}`))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/contacts', require('./routes/contacts'));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
