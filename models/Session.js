const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }, // Убедитесь, что рефери корректен
    token: { type: String, required: true }
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
