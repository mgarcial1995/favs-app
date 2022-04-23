const mongoose = require('mongoose')

const favsSchema = new mongoose.Schema({
    title: { type: String},
    description: { type: String},
    link: { type: String},
    idList: {type: String}
},
{
    collection: 'Favs'
});

module.exports = mongoose.model('Favs', favsSchema);
