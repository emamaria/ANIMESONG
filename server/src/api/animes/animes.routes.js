
const animeRoutes = require("express").Router();

const { isAuth } = require("../../middlewares/auth.middleware");

const upload = require('../../middlewares/updateFile.middleware');



const { getAnimes, getAnime, postAnime,updateAnime, deleteAnime} = require("./animes.controller")

animeRoutes.get("/", getAnimes)

animeRoutes.get("/:id", getAnime)

animeRoutes.post("/", [isAuth], upload.single('img'), postAnime)

animeRoutes.patch("/:id",[isAuth], upload.single('img'), updateAnime)

animeRoutes.delete("/:id", [isAuth], deleteAnime)


module.exports = animeRoutes;

