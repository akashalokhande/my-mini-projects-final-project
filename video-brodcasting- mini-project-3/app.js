const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 8007;
const MONGODB_URI = "mongodb://127.0.0.1:27017/moviedata";
const APIRouter = require("./Routes/APIRoutes");
const path = require("path")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", APIRouter);

app.get("/api/video", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("db connectd successfully");
      console.log("server port is running", PORT);
    });
  })
  .catch((error) => {
    console.log("unable to connect db");
    console.log(error);
  });
