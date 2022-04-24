const express = require('express');
const Project = require('../models/Project');

module.exports = {
    // Create new project
    async store(req, res) {
        try {
            const { user } = req.auth;
            console.log({user})
            req.body.creator = user._id;
            const newProject = await Project.create(req.body);
            console.log(newProject)
            return res.status(201).json(newProject);
        } catch (error) {
            console.log( "erro da criação do projeto", error)
            return res.status(400).json({ error });
        }
    },

    // Get 1 id
    async showId(req, res) {
        try {
            const project = await Project.findOne({_id: req.params.id}).populate("creator");
            console.log(project);
            return res.json(project);
        } catch (error) {
            console.log("erro update project", error)
            return res.status(400).json({ error });
        }
    },

    // Show all Projects
    async showAll(req, res) {
        try {
            const projects = await Project.find().populate("creator");
            console.log(projects);
            return res.json(projects);
        } catch (error) {
            console.log("erro de mostrar todos os projetos", error)
            return res.status(400).json({ error });
        }
    },

    // Update project
    async update(req, res) {
        try {
            const updatedProject = await Project.findOneAndUpdate({_id: req.params.id}, req.body);
            console.log(updatedProject);
            return res.json(updatedProject);
        } catch (error) {
            console.log("erro do update de projeto" , error)
            return res.status(400).json({ error });
        }
    }
    
    // //delete
    // async delete(req, res) {
    //     try {
    //         const updatedOffer = await Offer.findOneAndDelete({_id: req.params.id});
    //         //console.log(updatedOffer);
    //         return res.json(updatedOffer);
    //     } catch (error) {
    //         return res.status(400).json({ error });
    //     }
    // },
}
