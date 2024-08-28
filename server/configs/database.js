const mongoose = require('mongoose');

const connectToDB = () => {
  mongoose.connect('mongodb://localhost:27017/employeeDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));
};

module.exports = { connectToDB };
