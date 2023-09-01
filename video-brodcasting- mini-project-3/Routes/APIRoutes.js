const express = require("express");
const router = express.Router();
const Videobrodcast = require("../Controller/MovieController");
 

router.get("/api", Videobrodcast.videobrodcast);
router.get("/api/get-film-year/:year", Videobrodcast.videobrodcast);
router.get("/api/get-movie-id/:id", Videobrodcast.videobrodcast);
router.get("/video", Videobrodcast.Videoplayer);


module.exports = router;
