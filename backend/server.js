require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { connectDB } = require('./utils/db');

const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors({ origin: true })); // permissive for testing; lock down in prod
app.use(express.json());

// Health endpoint
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// API routes
app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);
app.use('/tenants', tenantRoutes);

// global error handler
app.use(errorHandler);

// start server (connect DB first)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  connectDB()
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => {
      console.error('DB connection failed', err);
      process.exit(1);
    });
}

module.exports = app; // exported for serverless adapters/tests
