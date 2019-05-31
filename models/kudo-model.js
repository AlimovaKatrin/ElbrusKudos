const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kudoSchema = new Schema({
    author: String,
    name: String,
    text: String
});

const Kudo = mongoose.model('Kudo', kudoSchema);

module.exports = Kudo;