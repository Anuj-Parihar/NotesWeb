const mongoose = require('mongoose');

let isConnected = false;

async function connectDB() {
  if (isConnected) return mongoose.connection;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI must be set in .env');
  const conn = await mongoose.connect(uri, {
    // mongoose 7 bundle defaults; options left for clarity
  });
  isConnected = true;
  console.log('MongoDB connected');
  return conn;
}

module.exports = { connectDB };
