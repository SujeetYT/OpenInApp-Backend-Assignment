const mongoose = require('mongoose');

// mongodb connection
const DatabaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { DatabaseConnection };