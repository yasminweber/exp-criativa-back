const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

module.exports = {
    //cadastro
    async cadastro(req, res) {
        try {
            let admin = await Admin.findOne({ email: req.body.email });
            if (admin) {
                return res.status(409).json({ error: "Email already in use" });
            }
            req.body.password = await bcrypt.hash(req.body.password, 10);
            // password = undefined
            const newAdmin = await Admin.create(req.body);
            //console.log(newAdmin)
            return res.json({ newAdmin });
        } catch (error) {
            return res.status(400).json({ error: "Registation failed" });
        }
    }
}
