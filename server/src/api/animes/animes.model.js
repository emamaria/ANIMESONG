
const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema(
    {
      title: {type: String, required: true, trim:true },
      year: {type: Number, required: false, trim: true},
      author: {type: String, required: true, trim:true },
      genre: {type: String, required: true, trim:true },
      img:{type: String, required: true, trim:true }
      
    
    })
    
    
    const Anime = mongoose.model("anime", animeSchema);
    
    module.exports = Anime;
