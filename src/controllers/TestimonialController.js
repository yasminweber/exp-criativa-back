const express = require('express');
const Testimonial = require('../models/Testimonial');

module.exports = {
    // Create new testimonial
    async store(req, res) {
        try {
            const { user } = req.auth;
            // console.log({ user })
            req.body.creator = user._id;
            const newTestimonial = await Testimonial.create(req.body);
            // console.log(newTestimonial)
            return res.status(201).json(newTestimonial);
        } catch (error) {
            console.log("erro da criação do depoimento", error)
            return res.status(400).json({ error });
        }
    },

    // Show all Testimonials
    async showAll(req, res) {
        try {
            const testimonials = await Testimonial.find().populate("user");
            // console.log(testimonials);
            return res.json(testimonials);
        } catch (error) {
            console.log("erro de mostrar todos os projetos", error)
            return res.status(400).json({ error });
        }
    }
}