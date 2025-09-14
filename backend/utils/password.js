const bcrypt = require('bcryptjs');

async function hashPassword(plain) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

async function compare(plain, hash) {
  return bcrypt.compare(plain, hash);
}

module.exports = { hashPassword, compare };
