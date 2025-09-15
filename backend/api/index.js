// backend/api/index.js
require('dotenv').config();
const serverless = require('serverless-http');
const app = require('../server'); // your exported express app
const { connectDB } = require('../utils/db');

let connected = false;

async function ensureDB() {
  if (!connected) {
    await connectDB();
    connected = true;
  }
}

// start DB connection on cold start (errors are logged)
ensureDB().catch(err => {
  console.error('DB connection failed (api/index.js)', err);
});

// Export the serverless wrapper for Vercel
module.exports = serverless(app);
