const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors'); // Import CORS
const { connectToDB } = require('./configs/database');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); 

// Database connection
connectToDB();

// Routes
app.use('/api', authRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
