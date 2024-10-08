const mongoose = require('mongoose');

const fencesSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    description: String,
    image: String,
    step: Number
});

const Fences = mongoose.model('Fences', fencesSchema);
module.exports = Fences;
