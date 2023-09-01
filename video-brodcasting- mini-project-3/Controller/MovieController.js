const MovieModel = require("../model/movieModel");
const fs = require("fs");

module.exports.videobrodcast = async (request, response) => {
  let { year, id } = request.params;
  const filterData = {};
  if (year !== undefined) filterData["Year"] = year;
  if (id !== undefined) filterData["_id"] = id;
  console.log(filterData);
  try {
    let result = await MovieModel.find(filterData);

    if (result.length === 0) {
      response.send({
        status: false,
        message: "movie is not available",
      });
    } else {
      response.send({
        status: true,
        movies: result,
      });
    }
  } catch (error) {
    MongoDBError(error.message);
    response.status(500).send({
      status: false,
      message: "Invalid id is passed",
    });
  }
};

module.exports.Videoplayer = (req, res) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  const videoPath = "./bigbuck.mp4";
  const videoSize = fs.statSync("bigbuck.mp4").size;

  const CHUNK_SIZE = 10 ** 6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);

  const videoStream = fs.createReadStream(videoPath, { start, end });

  videoStream.pipe(res);
};
