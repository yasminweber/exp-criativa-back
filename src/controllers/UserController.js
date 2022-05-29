const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = {
    //cadastro
    async cadastro(req, res) {
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(409).json({ error: "Email already in use" });
            }
            req.body.password = await bcrypt.hash(req.body.password, 10);
            // password = undefined
            const newUser = await User.create(req.body);
            console.log(newUser)
            return res.json({ newUser });
        } catch (error) {
            return res.status(400).json({ error: "Registation failed" });
        }
    },

    // Get 1 User
    async showId(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id });
            // console.log(user);
            return res.json(user);
        } catch (error) {
            console.log("erro para pegar um user", error)
            return res.status(400).json({ error });
        }
    },

    // Update user
    async update(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
            // console.log(updatedUser);
            return res.json(updatedUser);
        } catch (error) {
            console.log("erro do update do user", error)
            return res.status(400).json({ error });
        }
    }
}
