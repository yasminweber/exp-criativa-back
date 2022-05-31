const mongoose = require('mongoose');

// Project Post
const ProjectPostSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    projectRef: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true},
    title: { type: String, required: true },
    description: { type: String, required: true }
    
}, { timestamps: {} });

module.exports = mongoose.model('ProjectPost', ProjectPostSchema);
