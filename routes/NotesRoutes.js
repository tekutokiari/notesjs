const express = require('express');
const router = express.Router();

const NotesController = require('../controller/NotesController');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, NotesController.index);
router.post('/show', authenticate, NotesController.show);
router.post('/add', authenticate, NotesController.addnote);
router.post('/delete', authenticate, NotesController.deletenote);

module.exports = router;
