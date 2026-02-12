const mongoose = require('mongoose');
const User = require('../models/User');
const Document = require('../models/Document');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Promise.all([User.syncIndexes(), Document.syncIndexes()]);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
