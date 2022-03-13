const Anime = require("./animes.model");

const getAnimes = async(req, res, next) => {
    try{
       const animes = await Anime.find()
       res.status(200).json(animes);
    }catch(error){
        return next(error)
    }
}


const getAnime = async(req, res, next) => {

    try{
        const {id} = req.params;
        const anime = await Anime.findById(id);
        res.status(200).json(anime);
    }catch(error){
        return next(error)
    }
}

const postAnime = async(req, res, next) => {
    try{
        const anime = new Anime();
        anime.title = req.body.title
        anime.year = req.body.year
        anime.author = req.body.author
        anime.genre = req.body.genre
        anime.img = req.body.img

        const animeDb = await anime.save()
        return res.status(201).json(animeDb)
    }catch(error){
        return next(error)
    }
}

const updateAnime = async(req, res, next) => {
    try{
        const {id} = req.params
        const anime = new Anime(req.body)
        anime._id = id;
        const animeUpdate = await Anime.findByIdAndUpdate(id, anime)
        return res.status(200).json(animeUpdate)
    }catch(error){
        return next(error);
    }
}


const deleteAnime = async(req, res, next) => {
    try{
        const {id} = req.params
        const anime = await Anime.findByIdAndDelete(id)
        return res.status(200).json(anime)
    }catch(error){
        return next(error)
    }
}


module.exports = {
    getAnimes,
    getAnime,
    postAnime,
    updateAnime,
    deleteAnime
}