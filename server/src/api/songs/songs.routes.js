
const songRoutes = require("express").Router();

const { isAuth } = require("../../middlewares/auth.middleware");
const { getSongs, getSong, postSong,updateSong, deleteSong} = require("./songs.controller")

songRoutes.get("/", getSongs)

songRoutes.get("/:id", getSong)

songRoutes.post("/", postSong)

songRoutes.patch("/:id", updateSong)

songRoutes.delete("/:id",[isAuth], deleteSong)


module.exports = songRoutes;