const Song = require("./songs.model");
const { setError } = require('../../utils/error/error');

const getSongs = async(req, res, next) => {
    try{
       const songs = await Song.find().populate("anime")
       res.status(200).json(songs);
    }catch(error){
        return next(setError(400, 'Cannot get Songs'))
    }
}


const getSong = async(req, res, next) => {

    try{
        const {id} = req.params;
        const song = await Song.findById(id).populate("anime")
        res.status(200).json(song);
    }catch(error){
        return next(setError(400, 'Cannot get Song'))
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
        return next(setError(400, 'Cannot post Song'))
    }
}

const updateSong = async(req, res, next) => {
    try{
        const {id} = req.params
        const song = new Song()
        song.songtitle = req.body.songtitle
        song.year = req.body.year
        song.anime = req.body.anime
        song._id = id;
        const songUpdate = await Song.findByIdAndUpdate(id, song)
        return res.status(200).json(songUpdate)
    }catch(error){
        return next(setError(400, 'Cannot update Song'));
    }
}


const deleteSong = async(req, res, next) => {
    try{
        const {id} = req.params
        const song = await Song.findByIdAndDelete(id)
        return res.status(200).json(song)
    }catch(error){
        return next(setError(400, 'Cannot delete Song'))
    }
}


module.exports = {
    getSongs,
    getSong,
    postSong,
    updateSong,
    deleteSong
}