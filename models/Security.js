const mongoose = require('mongoose');

const securitySchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    description: String,
    image: String
});

const Security = mongoose.model('Security', securitySchema);
module.exports = Security;
