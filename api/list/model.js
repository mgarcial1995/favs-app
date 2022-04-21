const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    name: { type: String},
    // userID: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // }
    favs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Favs"
    }],
},
{
    collection: 'List'
});

module.exports = mongoose.model('List', listSchema);
