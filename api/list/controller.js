const ListModel = require("./model");
const {Model} = require("../users/model");
const jwt = require("jsonwebtoken");

exports.getAllLists = (req, res) => {
  ListModel.find()
    .exec()
    .then((response) => {
      res.status(200).json({ success: true, lists: response });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, error: err });
    });
};
exports.getListById = async (req, res) => {
  const lists = await ListModel.findOne({ _id: req.params.id });
  return res.status(200).json({ success: true, response: lists });
};
exports.createList = async (req, res, next) => {
  const body = req.body;

  const user = await Model.findById(req.decoded.id);

  // console.log(req.decoded,"respons");
  const List = new ListModel({
    name: body.name,
  });
  await List.save()
    .then((response) => {
      res.status(200).json({
        success: true,
        data: response,
      });
      if (!user) {
        const message = `User not exist`;
        next({
          message,
          statusCode: 404,
        });
      } else {
        let list = [...user.lists]
        list.push(response._id);
        Model.findByIdAndUpdate(user._id, { $set: { lists: list } }).exec();
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
};

exports.deleteList = (req, res) => {
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
exports.updateList = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  ListModel.findByIdAndUpdate(id, body, { new: true })
    .then((response) => {
      res.status(200).json({ success: true, data: response });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, error: err });
    });
};
