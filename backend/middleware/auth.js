const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function auth(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: 'Authorization required' });
    const [bearer, token] = header.split(' ');
    if (bearer !== 'Bearer' || !token) return res.status(401).json({ error: 'Invalid authorization header' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub).populate('tenant');
    if (!user) return res.status(401).json({ error: 'User not found' });

    req.user = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      tenant: user.tenant
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token', details: err.message });
  }
}

module.exports = auth;
