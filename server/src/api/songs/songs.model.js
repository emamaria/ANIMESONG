const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
{
  songtitle: {type: String, required: true, trim:true },
  year: {type: Number, required: false, trim: true},
  anime: [{type:mongoose.Schema.Types.ObjectId, ref: "anime", required: true}]

})


const Song = mongoose.model("song", songSchema);

module.exports = Song;