const mongoose = require('mongoose')
let listField = {
    name: { type: String}
}
let refList = {
    favs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Favs"
    }],
};
const ListModel = mongoose.Schema(
    Object.assign(listField, refList),
    { collection: "List" },
    { timestamps: true },
);
module.exports = { ListModel: mongoose.model("List", ListModel), refList };
