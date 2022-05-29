const express = require('express');
const Cause = require('../models/Cause');

module.exports = {
    // add new cause
    async store(req, res) {
        try {
            const cause = await Cause.create(req.body);
            //console.log(cause);
            return res.send({ cause });
        } catch (error) {
            return res.status(400).send({ error: 'Problem adding cause' });
        }
    },

    // show all causes
    async showAll(req, res) {
        try {
            const causes = await Cause.find().sort({ cause: 'asc',});
            //console.log(causes);
            return res.json(causes);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }
}
