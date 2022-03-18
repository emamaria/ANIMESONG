
const songRoutes = require("express").Router();

const { isAuth } = require("../../middlewares/auth.middleware");
const { getSongs, getSong, postSong,updateSong, deleteSong} = require("./songs.controller")

songRoutes.get("/", getSongs)

songRoutes.get("/:id", getSong)

songRoutes.post("/",[isAuth], postSong)

songRoutes.patch("/:id",[isAuth], updateSong)

songRoutes.delete("/:id",[isAuth], deleteSong)


module.exports = songRoutes;