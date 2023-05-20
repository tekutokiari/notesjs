const { default: mongoose } = require('mongoose');
const Note = require('../models/NotesModel');

//Search all the notes
const index = async (req, res, next) => {
  try {
    if (req.query.page && req.query.limit) {
      await Note.paginate({}, { page: req.query.page, limit: req.query.limit });
      res.status(200).json({
        response,
      });
    } else {
      await Note.find();
      res.status(200).json({
        response,
      });
    }
  } catch (error) {
    req.status(400).json({
      message: `Error occured => ${error}`,
    });
  }
};

//Query for a note by noteID
const show = async (req, res, next) => {
  try {
    let noteID = req.body.noteID;
    await Note.findById(noteID);
    res.status(200).json({
      response,
    });
  } catch (error) {
    res.status(400).json({
      message: `Error occured => ${error}`,
    });
  }
};

const addnote = async (req, res, next) => {
  try {
    let note = new Note({
      note_id: new mongoose.Types.ObjectId(),
      note: req.body.note_message,
      user_id: req.user.id,
    });
    await note.save();
    res.json({
      message: `Note added`,
    });
  } catch (error) {
    res.json({
      message: `Error occured => ${error}`,
    });
  }
};

const deletenote = async (req, res, next) => {
  try {
    let noteID = req.body.noteID;
    await Note.findByIdAndRemove(noteID);
    res.json({
      response: `Note deleted`,
    });
  } catch (error) {
    res.json({
      message: `Error occured => ${error}`,
    });
  }
};

module.exports = {
  index,
  show,
  addnote,
  deletenote,
};
