const User = require("../Models/UserRegisterModel");
const jwt = require("jsonwebtoken");
const config = require("../Config/config");

const create_token = (id) => {
  try {
    const token = jwt.sign({ _id: id }, config.secret_jwt, { expiresIn: "30m" });
    return token;
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports.register_user = async (req, resp) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      password: req.body.password,
    });
    const userData = await User.findOne({ email: req.body.email });
    if (userData) {
      resp
        .status(200)
        .send({ success: false, msg: "This Email Is already Register" });
    } else {
      const user_data = await user.save();
      resp.status(200).send({ success: true, data: user_data });

    }
  } catch (error) {
    resp.status(400).send(error.message);
    console.log(error);
  }
};

module.exports.user_login = async (req, resp) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userData = await User.findOne({ email: email, password: password });
    if (userData) {
      const tokenData = await create_token(userData._id);
      const userResult = {
        _id: userData._id,
        email: userData.email,
        password: userData.password,
        name: userData.name,
        mobileNumber: userData.mobileNumber,
        token: tokenData,
      };
      const response = {
        success: true,
        msg: "User Details Fetch Successfully",
        data: userResult,
      };

      resp.status(200).send(response);
    } else {
      resp
        .status(200)
        .send({ success: false, msg: "Login Details Are Incorrect" });
    }
  } catch (error) {
    resp.status(400).send({ msg: "something is wrong" });
  }
};
