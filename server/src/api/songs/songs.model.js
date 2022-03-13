const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
{
  songtitle: {type: String, required: true, trim:true },
  year: {type: Number, required: false, trim: true},
  anime: {type: String, required: true, trim:true }

})


const Song = mongoose.model("song", songSchema);

module.exports = Song;