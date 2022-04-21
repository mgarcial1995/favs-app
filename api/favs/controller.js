const ListModel = require("./model");
const jwt = require("jsonwebtoken");

exports.getAllFavs = (req, res) => {
  ListModel.find()
    .exec()
    .then((response) => {
      res.status(200).json({ success: true, favs: response });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, error: err });
    });
};
exports.getFavById = async (req, res) => {
  const lists = await ListModel.findOne({ _id: req.params.id });
  return res.status(200).json({ success: true, response: lists });
};
exports.createFav = async (req, res) => {
  const body = req.body;
  const List = new ListModel({
    name: body.password,
  });
  await List.save()
    .then((response) => {
      res.status(200).json({
        success: true,
        data: response,
      });
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
};

exports.deleteFav = (req, res) => {
  const id = req.params.id;

  ListModel.findByIdAndDelete(id)
    .then((response) => {
      res.status(200).json({ success: true, message: "List deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, error: err });
    });
};
exports.updateFav = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  ListModel.findByIdAndUpdate(id, body, { new: true })
    .then((response) => {
      res
        .status(200)
        .json({ success: true, data: response });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, error: err });
    });
};
