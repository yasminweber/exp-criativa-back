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
    },

    // Get 1 Admin
    async showId(req, res) {
        try {
            const admin = await Admin.findOne({ _id: req.params.id });
            // console.log(admin);
            return res.json(admin);
        } catch (error) {
            console.log("erro para pegar um admin", error)
            return res.status(400).json({ error });
        }
    },

    // Show all Admins
    async showAll(req, res) {
        try {
            const admins = await Admin.find();
            // console.log(admins);
            return res.json(admins);
        } catch (error) {
            console.log("erro de mostrar todos os admins", error)
            return res.status(400).json({ error });
        }
    },

    // Update user
    async update(req, res) {
        try {
            const updatedAdmin = await Admin.findOneAndUpdate({ _id: req.params.id }, req.body);
            // console.log(updatedAdmin);
            return res.json(updatedAdmin);
        } catch (error) {
            console.log("erro do update do admin", error)
            return res.status(400).json({ error });
        }
    },

    // Delete project
    async delete(req, res) {
        try {
            const admin = await Admin.findOneAndDelete({ _id: req.params.id });
            // console.log("admin", admin);
            return res.json(admin);
        } catch (error) {
            console.log("erro pra deletar admin", error)
            return res.status(400).json({ error });
        }
    }
}
