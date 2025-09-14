const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const { upgrade } = require('../controllers/tenantsController');

router.post('/:slug/upgrade', auth, requireRole('Admin'), upgrade);

module.exports = router;
