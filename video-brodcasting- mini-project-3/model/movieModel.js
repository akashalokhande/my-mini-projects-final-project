const mongoose = require("mongoose");

const VideobrodcastSchema = new mongoose.Schema({
  Title: { type: String },
  Year: { type: String },
  Rated: { type: String },
  Released: { type: String },
  Runtime: { type: String },
  Genre: { type: String },
  Director: { type: String },
  Writer: { type: String },
  Actors: { type: String },
  Plot: { type: String },
  Language: { type: String },
  Country: { type: String },
  Awards: { type: String },
  Poster: { type: String },
  Metascore: { type: String },
  imdbRating: { type: String },
  imdbVotes: { type: String },
  imdbID: { type: String },
  Type: { type: String },
  Response: { type: String },
  Images: { type: String },
  Array: { type: String },
});

const MovieModel = mongoose.model("films", VideobrodcastSchema);

module.exports = MovieModel;
