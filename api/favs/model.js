const mongoose = require('mongoose')

const favsSchema = new mongoose.Schema({
    title: { type: String},
    description: { type: String},
    link: { type: String},
    listID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "List"
    }
},
{
    collection: 'Favs'
});

module.exports = mongoose.model('Favs', favsSchema);
