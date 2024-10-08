const mongoose = require('mongoose');

const repairSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
});

const Repairs = mongoose.model('Repairs', repairSchema);
module.exports = Repairs;
