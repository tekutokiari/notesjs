const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoosePaginate = require('mongoose-paginate-v2');

const noteSchema = new Schema(
  {
    note_id: {
      type: Schema.Types.ObjectId,
    },
    note: {
      type: String,
    },
    user_id: {
      type: String,
    },
  },
  { timestamps: true }
);
noteSchema.plugin(mongoosePaginate);

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
