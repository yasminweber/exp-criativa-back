const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Admin = require('../models/Admin');

module.exports = {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            let user = await User.findOne({ email }).select('+password');
            if (user) {
                const password_verify = await bcrypt.compare(password, user.password);
                if (password_verify) {
                    const token = jwt.sign({ user }, process.env.SECRET_API_KEY);
                    console.log(token)
                    return res.json({ token });
                }
                return res.status(400).json({ error: "Incorrect Password" });
            }
            return res.status(400).json({ error: "User not found" });
        } catch (error) {
            return res.status(400).json({ error });
        }
    },

    async loginAdmin(req, res) {
        try {
            const { email, password } = req.body;
            let admin = await Admin.findOne({ email }).select('+password');
            if (admin) {
                const password_verify = await bcrypt.compare(password, admin.password);
                if (password_verify) {
                    const token = jwt.sign({ admin }, process.env.SECRET_API_KEY);
                    console.log(token)
                    return res.json({ token });
                }
                return res.status(400).json({ error: "Incorrect Password" });
            }
            return res.status(400).json({ error: "Admin user not found" });
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

}
