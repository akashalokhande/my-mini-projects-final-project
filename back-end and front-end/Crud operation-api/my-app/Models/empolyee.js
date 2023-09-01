const mongoose = require("mongoose");

const Employschema = new mongoose.Schema({
  name: {
    type: String,
    match:
    /^[a-zA-Z]+[a-zA-Z]+$/
  },
  designation: {
    type: String,
    match:
    /^[a-zA-Z\-]+$/
  },

  Email: {
    type: String,
    match:
      /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  },
  Phone: {
    type: String,
    match: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
  },
  age: {
    type: Number,
    match: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
  },
});

const Empolymodel = mongoose.model("empolyees", Employschema);

module.exports = Empolymodel;
