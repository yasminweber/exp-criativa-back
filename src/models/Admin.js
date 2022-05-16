const mongoose = require('mongoose');

// Informações do Admin
const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, lowercase: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true, unique: true, lowercase: true },
    profileImage: { type: String, required: false },
    
}, { timestamps: {} });

module.exports = mongoose.model('Admin', AdminSchema);
