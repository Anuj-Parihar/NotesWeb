// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { login, inviteUser } = require("../controllers/authController");
const auth = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");

// Public route: login
router.post("/login", login);

// Admin-only route: invite user
router.post("/invite", auth, requireRole("Admin"), inviteUser);

module.exports = router;
