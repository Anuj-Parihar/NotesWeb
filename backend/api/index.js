// api/index.js
const app = require('../server'); // this is your Express app
const { connectDB } = require('../utils/db');

// Ensure DB is connected before handling requests
module.exports = async (req, res) => {
  try {
    await connectDB();
    return app(req, res); // let Express handle it
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};
