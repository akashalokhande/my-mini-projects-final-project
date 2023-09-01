const express = require("express");
const app = express();
const cors = require("cors")
const APIRouter = require("./Routes/APIRouter");
const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://127.0.0.1:27017/Empolydata";

PORT = 6003;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/empolyee", APIRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("server port is running on", PORT);
    });
  })
  .catch((error) => {
    console.log(" unable to Connect with DB");
    console.log(error);
  });
