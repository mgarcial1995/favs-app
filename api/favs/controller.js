const FavsModel = require("./model");
const {ListModel} = require("../list/model");
const jwt = require("jsonwebtoken");

exports.getAllFavs = (req, res) => {
  FavsModel.find()
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
  const lists = await FavsModel.findOne({ _id: req.params.id });
  return res.status(200).json({ success: true, response: lists });
};
exports.createFav = async (req, res) => {
  const body = req.body;

  const Fav = new FavsModel({
    title: body.title,
    description: body.description,
    link: body.link,
    idList: body.idList
  });
  const list = await ListModel.findById(Fav.idList);
  await Fav.save()
    .then(async (response) => {
      let listFavs = [...list.favs]
      listFavs.push(response._id)
      await ListModel.findByIdAndUpdate(Fav.idList,{$set:{favs: listFavs}})
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

  FavsModel.findByIdAndDelete(id)
    .then((response) => {
      res.status(200).json({ success: true, message: "Fav deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, error: err });
    });
};
exports.updateFav = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  FavsModel.findByIdAndUpdate(id, body, { new: true })
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
