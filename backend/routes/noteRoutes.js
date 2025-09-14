const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const notesController = require('../controllers/notesController');

router.use(auth); // all notes routes require auth

router.post('/', notesController.createNote);
router.get('/', notesController.listNotes);
router.get('/:id', notesController.getNote);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);

module.exports = router;
