const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const cors = require('cors');
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
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
