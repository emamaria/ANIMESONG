
const animeRoutes = require("express").Router();

const { isAuth } = require("../../middlewares/auth.middleware");
const { getAnimes, getAnime, postAnime,updateAnime, deleteAnime} = require("./animes.controller")

animeRoutes.get("/", getAnimes)

animeRoutes.get("/:id", getAnime)

animeRoutes.post("/", postAnime)

animeRoutes.patch("/:id",[isAuth], updateAnime)

animeRoutes.delete("/:id", [isAuth], deleteAnime)


module.exports = animeRoutes;

