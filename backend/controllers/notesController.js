const Note = require('../models/Note');
const Tenant = require('../models/Tenant');

async function canCreate(tenantId) {
  const tenant = await Tenant.findById(tenantId);
  if (!tenant) throw new Error('Tenant not found');
  if (tenant.plan === 'pro') return true;
  const count = await Note.countDocuments({ tenant: tenantId });
  return count < 3; // free plan limit = 3 notes
}

exports.createNote = async (req, res, next) => {
  try {
    const tenantId = req.user.tenant._id;
    const allowed = await canCreate(tenantId);
    if (!allowed) return res.status(403).json({ error: 'Note limit reached for Free plan' });
    const { title, content } = req.body;
    if (!title) return res.status(400).json({ error: 'title is required' });
    const note = await Note.create({ title, content, tenant: tenantId, createdBy: req.user.id });
    res.status(201).json(note);
  } catch (err) { next(err); }
};

exports.listNotes = async (req, res, next) => {
  try {
    const tenantId = req.user.tenant._id;
    const notes = await Note.find({ tenant: tenantId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) { next(err); }
};

exports.getNote = async (req, res, next) => {
  try {
    const tenantId = req.user.tenant._id;
    const note = await Note.findOne({ _id: req.params.id, tenant: tenantId });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (err) { next(err); }
};

exports.updateNote = async (req, res, next) => {
  try {
    const tenantId = req.user.tenant._id;
    const note = await Note.findOneAndUpdate({ _id: req.params.id, tenant: tenantId }, req.body, { new: true });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (err) { next(err); }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const tenantId = req.user.tenant._id;
    const note = await Note.findOneAndDelete({ _id: req.params.id, tenant: tenantId });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
