const mongoose = require('mongoose');

// Causes - cause
const CauseSchema = new mongoose.Schema({
    cause: { type: String, required: true }
});

module.exports = mongoose.model('Causes', CauseSchema);
