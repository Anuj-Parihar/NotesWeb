require('dotenv').config();
const { connectDB } = require('../utils/db');
const Tenant = require('../models/Tenant');
const User = require('../models/User');
const { hashPassword } = require('../utils/password');

async function run() {
  await connectDB();

  // create tenants
  const acme = await Tenant.findOneAndUpdate(
    { slug: 'acme' },
    { name: 'Acme', slug: 'acme', plan: 'free' },
    { upsert: true, new: true }
  );

  const globex = await Tenant.findOneAndUpdate(
    { slug: 'globex' },
    { name: 'Globex', slug: 'globex', plan: 'free' },
    { upsert: true, new: true }
  );

  const passwordHash = await hashPassword('password');

  const users = [
    { email: 'admin@acme.test', role: 'Admin', tenant: acme._id },
    { email: 'user@acme.test', role: 'Member', tenant: acme._id },
    { email: 'admin@globex.test', role: 'Admin', tenant: globex._id },
    { email: 'user@globex.test', role: 'Member', tenant: globex._id }
  ];

  for (const u of users) {
    const existing = await User.findOne({ email: u.email });
    if (!existing) {
      await User.create({ email: u.email, passwordHash, role: u.role, tenant: u.tenant });
      console.log('Created', u.email);
    } else {
      console.log('Exists', u.email);
    }
  }

  console.log('Seeding complete');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
