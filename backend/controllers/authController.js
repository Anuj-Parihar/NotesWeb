const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { compare, hashPassword } = require('../utils/password');

function signToken(user) {
  return jwt.sign({ sub: user._id.toString(), tid: user.tenant.toString() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });
    const user = await User.findOne({ email }).populate('tenant');
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = signToken(user);
    res.json({ token, user: { email: user.email, role: user.role, tenant: user.tenant.slug } });
  } catch (err) { next(err); }
};

// Admin-only invite: creates user in same tenant with password 'password' (per spec)
exports.inviteUser = async (req, res, next) => {
  try {
    const { email, role } = req.body;
    if (!email) return res.status(400).json({ error: 'email required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const passwordHash = await hashPassword('password');
    const newUser = await User.create({
      email,
      passwordHash,
      role: role || 'Member',
      tenant: req.user.tenant._id
    });
    res.status(201).json({ message: 'User invited (password: password)', user: { email: newUser.email, role: newUser.role } });
  } catch (err) { next(err); }
};
