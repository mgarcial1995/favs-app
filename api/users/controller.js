const {Model, reference} = require("./model");
const jwt = require("jsonwebtoken");
const referencesNames = Object.getOwnPropertyNames(reference);

exports.getAllUsers = async (req, res) => {
  const populate = referencesNames.join(' ');
  await Model.find()
    .populate(populate)
    .exec()
    .then((response) => {
      res.status(200).json({ success: true, users: response });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, error: err });
    });
};
exports.signinUser = async (req, res) => {
  const user = await Model.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "El usuario no existe" });
  }
  let isValid = await Model.comparePassword(
    req.body.password,
    user.password
  );
  if (!isValid)
    return res.status(401).json({ token: null, message: "Invalid password" });
  const token = jwt.sign({ id: user._id }, "user", {
    expiresIn: 86400, //24hrs
  });
  res.json({ token });
};
exports.signupUser = async (req, res) => {
  const body = req.body;
  const User = new Model({
    password: body.password,
    email: body.email,
    lists: []
  });
  await User.save()
    .then((response) => {
      console.log(response);
      let token = jwt.sign({ id: response._id }, "user", {
        expiresIn: 86400, //24hrs
      });
      res.status(200).json({
        success: true,
        token: token,
        data: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, error: err });
    });
};

exports.deleteAllUsers = (req, res) => {
  // const courses = db.get('courses').value(); // query
  Model.deleteMany()
    .then((response) => {
      res.status(200).json({ success: true, message: "All users delete" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, error: err });
    });
};

exports.updateUser = (req, res) => {
  // const courses = db.get('courses').value(); // query
  const id = req.params.id;
  const body = req.body;
  Model.findByIdAndUpdate(id, body, { new: true })
    .then((response) => {
      res
        .status(200)
        .json({ success: true, message: "User update", data: response });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, error: err });
    });
};