const mongoose = require('mongoose');

// Testimonial
const TestimonialSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true }

}, { timestamps: {} });

module.exports = mongoose.model('Testimonial', TestimonialSchema);
