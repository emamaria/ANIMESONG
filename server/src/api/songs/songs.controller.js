const Song = require("./songs.model");

const getSongs = async(req, res, next) => {
    try{
       const songs = await Song.find().populate("anime")
       res.status(200).json(songs);
    }catch(error){
        return next(error)
    }
}


const getSong = async(req, res, next) => {

    try{
        const {id} = req.params;
        const song = await Song.findById(id).populate("anime")
        res.status(200).json(song);
    }catch(error){
        return next(error)
    }
}

const postSong = async(req, res, next) => {
    try{
        const song = new Song();
        song.songtitle = req.body.songtitle
        song.year = req.body.year
        song.anime = req.body.anime
        

        const songDb = await song.save()
        return res.status(201).json(songDb)
    }catch(error){
        return next(error)
    }
}

const updateSong = async(req, res, next) => {
    try{
        const {id} = req.params
        const song = new Song(req.body)
        song._id = id;
        const songUpdate = await Song.findByIdAndUpdate(id, song)
        return res.status(200).json(songUpdate)
    }catch(error){
        return next(error);
    }
}


const deleteSong = async(req, res, next) => {
    try{
        const {id} = req.params
        const song = await Song.findByIdAndDelete(id)
        return res.status(200).json(song)
    }catch(error){
        return next(error)
    }
}


module.exports = {
    getSongs,
    getSong,
    postSong,
    updateSong,
    deleteSong
}