const Empolye = require("../Models/empolyee");

module.exports.index = async (req, res) => {
  // let token = req.params.token;

  const result = await Empolye.find();

  try {
    if (result) {
      res.send({
        status: 200,
        result,
      });
    }
  } catch (error) {
    res.send({
      massage: "An error Occured" + error,
    });
  }
};

module.exports.show = (req, res) => {
  let { id } = req.params;
  console.log(id);
  Empolye.findById(id)
    .then((result) => {
      res.send({
        status: 200,
        result,
      });
    })
    .catch((error) => {
      res.send({
        massage: "An error Occured" + error,
      });
    });
};

module.exports.search = (req, res) => {
  let { name } = req.params;
  console.log(name);
  Empolye.find({
    name: { $regex: name + ".*", $options: "i" },
  })
    .then((result) => {
      if ( result) {
        res.send({
          status: 200,
          result
        });
      }
    })
    .catch((error) => {
      res.send({
        massage: "An error Occured" + error,
      });
    });
};

module.exports.add = async (req, res) => {
  // let empolyee = new Empolye({
  //   name: req.body.name,
  //   designation: req.body.designation,
  //   Email: req.body.Email,
  //   age: req.body.age,
  //   Phone: req.body.Phone,
  // });
  // empolyee
  //   .save()
  //   .then((result) => {
  //     const employeedata = result.find({
  //       Email: req.body.Email,
  //       Phone: req.body.Phone,
  //     });
  //     if (employeedata) {
  //       res.status(200).send({
  //         success: false,
  //         massage: "This Email OR Phone Is already Register",
  //       });
  //     } else {

  //       res.status(200).send({ success: true, data:result });
  //     }
  //   })
  //   .catch((error) => {
  //     res.send({
  //       massage: "An error Occured: " + error,
  //       status: 500,
  //     });
  //   });
  try {
    const empolyee = new Empolye({
      name: req.body.name,
      designation: req.body.designation,
      Email: req.body.Email,
      age: req.body.age,
      Phone: req.body.Phone,
    });
    const empolyeeData = await Empolye.findOne({
      Email: req.body.Email,
      Phone: req.body.Phone,
    });
    if (empolyeeData) {
      res.status(200).send({
        success: false,
        massage: "This Email OR Phone Is already Register",
      });
    } else {
      const empolyee_data = await empolyee.save();
      res.status(200).send({ success: true, data: empolyee_data });
    }
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error);
  }
};

module.exports.update = (req, res) => {
  // let empolyeeID = req.body.empolyeeID;

  // let UpdateData = {
  //   name: req.body.name,
  //   designation: req.body.designation,
  //   Email: req.body.Email,
  //   age: req.body.age,
  //   Phone: req.body.Phone,
  // };
  Empolye.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((result) => {
      res.send({
        massage: "Empolyee updated successfully!",
        status: 200,
        result,
      });
    })
    .catch((error) => {
      res.send({
        massage: "An error Occured",
      });
    });
  console.log(req.params);
};

module.exports.remove = (req, res) => {
  let empolyeeID = req.params.employeeId;
  console.log("Params delete", req.params);

  Empolye.findByIdAndDelete(empolyeeID)
    .then((result) => {
      res.send({
        massage: "Empolyee delete successfully!",
        status: 204,
        result,
      });
    })
    .catch((error) => {
      res.send({
        massage: "An error Occured",
      });
    });
};
