const Anime = require("./animes.model");
const { deleteImgCloudinary } = require('../../middlewares/deletefile.middleware');
const { setError } = require('../../utils/error/error');


const getAnimes = async(req, res, next) => {
    try{
       const animes = await Anime.find()
       res.status(200).json(animes);
    }catch(error){
        return next(setError(400, 'Cannot get Animes'))
    }
}


const getAnime = async(req, res, next) => {

    try{
        const {id} = req.params;
        const anime = await Anime.findById(id);
        res.status(200).json(anime);
    }catch(error){
        return next(setError(400, 'Cannot get Anime'))
    }
}

const postAnime = async(req, res, next) => {
    try{
        const anime = new Anime();
        anime.title = req.body.title
        anime.year = req.body.year
        anime.author = req.body.author
        anime.genre = req.body.genre
        if (req.file)anime.img = req.file.path

        const animeDb = await anime.save()
        return res.status(201).json(animeDb)
    }catch(error){
        return next(setError(400, 'Cannot post Anime'))
    }
}

const updateAnime = async(req, res, next) => {
    try{
        const {id} = req.params
        const anime = new Anime()
        anime.title = req.body.title
        anime.year = req.body.year
        anime.author = req.body.author
        anime.genre = req.body.genre
        if (req.file)anime.img = req.file.path
        anime._id = id;
        const animeUpdate = await Anime.findByIdAndUpdate(id, anime)
        return res.status(200).json(animeUpdate)
    }catch(error){
        return next(setError(400, 'Cannot update Anime'));
    }
}


const deleteAnime = async(req, res, next) => {
    try{
        const {id} = req.params
        const anime = await Anime.findByIdAndDelete(id)
        if(anime.img)deleteImgCloudinary(anime.img)
        return res.status(200).json(anime)
    }catch(error){
        return next(setError(400, 'Cannot delete Anime'))
    }
}


module.exports = {
    getAnimes,
    getAnime,
    postAnime,
    updateAnime,
    deleteAnime
}