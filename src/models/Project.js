const mongoose = require('mongoose');

// Project
const ProjectSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    projectName: { type: String, required: true },
    cause: { type: String, required: true },
    where: { type: String, required: true },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    description: { type: String, required: true },
    quantityBenefited: { type: String, required: true },
    quantityVolunteers: { type: String, required: true },
    volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }],
    volunteersParticipated: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProjectPost", required: false }],
    improvement: { type: String, required: false },
    status: { type: String, required: true },
    projectImage: { type: String, required: false }

}, { timestamps: {} });

module.exports = mongoose.model('Project', ProjectSchema);
