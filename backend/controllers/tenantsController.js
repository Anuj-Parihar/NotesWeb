const Tenant = require('../models/Tenant');

exports.upgrade = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const tenant = await Tenant.findOne({ slug });
    if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

    // Ensure caller belongs to the tenant they want to upgrade
    if (String(req.user.tenant._id) !== String(tenant._id)) {
      return res.status(403).json({ error: 'Forbidden: cannot upgrade a different tenant' });
    }

    tenant.plan = 'pro';
    await tenant.save();
    res.json({ message: 'Tenant upgraded to pro', tenant: { slug: tenant.slug, plan: tenant.plan } });
  } catch (err) { next(err); }
};
