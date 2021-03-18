const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: Schema.Types.String,
  genre: Schema.Types.String,
  directorId: Schema.Types.ObjectId,
  rate: Schema.Types.Number,
  watched: Schema.Types.Boolean
});

module.exports = mongoose.model('Movie', movieSchema);
