const mongoose = require("mongoose");

const userRegisterdetails = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // match:
    //   /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    match:
      /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  },
  mobileNumber: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    match: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
  },
  password: {
    type: String,
    required: true,
  },
});

const usermodel = mongoose.model("users",userRegisterdetails);

module.exports = usermodel;
