const express = require('express');
const Project = require('../models/Project');
const Post = require('../models/ProjectPost');

module.exports = {
    // Create new project
    async store(req, res) {
        try {
            const { user } = req.auth;
            // console.log({ user })
            req.body.creator = user._id;
            const newProject = await Project.create(req.body);
            // console.log(newProject)
            return res.status(201).json(newProject);
        } catch (error) {
            console.log("erro da criação do projeto", error)
            return res.status(400).json({ error });
        }
    },

    // // Get 1 id
    // async showId(req, res) {
    //     try {
    //         const project = await Project.findOne({ _id: req.params.id }).populate("creator").populate("volunteers").populate("posts").populate("volunteersParticipated");
    //         // console.log(project);
    //         return res.json(project);
    //     } catch (error) {
    //         console.log("erro update project", error)
    //         return res.status(400).json({ error });
    //     }
    // },

    // Show all Projects
    async showAll(req, res) {
        try {
            const projects = await Project.find().populate("creator");
            // console.log(projects);
            return res.json(projects);
        } catch (error) {
            console.log("erro de mostrar todos os projetos", error)
            return res.status(400).json({ error });
        }
    },

    // Update post
    async update(req, res) {
        try {
            const updatedPost = await Post.findOneAndUpdate({ _id: req.params.id }, req.body);
            return res.json(updatedPost);
        } catch (error) {
            console.log("erro do update de post", error)
            return res.status(400).json({ error });
        }
    },

    // Delete project
    async delete(req, res) {
        try {
            const project = await Project.findOneAndDelete({ _id: req.params.id });
            //console.log(project);
            return res.json(project);
        } catch (error) {
            console.log("erro pra deletar", error)
            return res.status(400).json({ error });
        }
    },

    // filter causes
    async filter(req, res) {
        try {
            let filter1, filter2, filter3, filter4, filter5 = ''
            filter1 = req.query.filterCause1;
            filter2 = req.query.filterCause2;
            filter3 = req.query.filterCause3;
            filter4 = req.query.filterCause4;
            filter5 = req.query.filterCause5;
            console.log("1", filter1, ", 2 ", filter2, ", 3 ", filter3, ", 4 ", filter4, ", 5 ", filter5)

            let option = 'teste';

            if (filter5 === undefined) {
                if (filter4 === undefined) {
                    if (filter3 === undefined) {
                        if (filter2 === undefined) {
                            option = {cause: {$in: [filter1]}}
                        }
                        option = {cause: {$in: [filter1, filter2]}}
                    }
                    option = {cause: {$in: [filter1, filter2, filter3]}}
                }
                option = {cause: {$in: [filter1, filter2, filter3, filter4]}}
            } else {
                option = {cause: {$in: [filter1, filter2, filter3, filter4, filter5]}}
            }

            //console.log("option", option)

            const projects = await Project.find(option).populate("username");
            //console.log(projects)
            return res.json(projects);
        } catch (error) {
            console.log("erro carregar filtro", error)
            return res.status(400).json({ error });
        }
    },

    // Projects from user
    async showPerUser(req, res) {
        try {
            const project = await Project.find({creator: req.params.id}).populate("username");
            //console.log(project);
            return res.json(project);
        } catch (error) {
            return res.status(400).json({ error });
        }
    },

    // Sign up and Unsubscribe
    async signup(req, res) {
        const { user } = req.auth;
        const { id } = req.params;
        const project = await Project.findOne({ _id: id });

        let exists = false;
        let positionProject, positionUser = 0;
        // se usuário ja está inscrito
        for (let count = 0; count < project.volunteers.length; count++) {
            if (project.volunteers[count] == user._id) {
                exists = true;
                positionProject = count;
            }
        }
        
        for (let count = 0; count < user.volunteerIn.length; count++) {
            if (user.volunteerIn[count] == project._id) {
                positionUser = count;
            }
        }

        if (exists) {
            console.log("usuário já está inscrito")
            project.volunteers.splice(positionProject); // tira o user, se ja estiver inscrito
            user.volunteerIn.splice(positionUser); // tira o projeto, se ja estiver inscrito
        } else {
            console.log("usuário não inscrito")
            project.volunteers.push(user._id); // inscreve o user
            user.volunteerIn.push(project._id); // inscreve o projeto
        }
        await Project.findOneAndUpdate({ _id: id }, { volunteers: project.volunteers });
        await User.findOneAndUpdate({ _id: user._id }, { volunteerIn: user.volunteerIn });

        return res.json([project, user]);
    },

    // Create new post
    async newPost(req, res) {
        const project = await Project.findOne({ _id: req.params.id });
        let arrayPosts = [];
        const { user } = req.auth;

        if (project.posts !== undefined){
            console.log(" dentro if", project.posts.length)
            for (let count = 0; count < project.posts.length; count ++) {
                arrayPosts.push(project.posts[count]);
            }
        }
        const newPost = await Post.create({creator: user, projectRef: req.params.id, description: req.body.description});
        arrayPosts.push(newPost);
        const updatedUser = await Project.findOneAndUpdate({ _id: req.params.id }, {posts: arrayPosts});
        return res.json(newPost._id);
    },

    // Give presence to users
    async attendance(req, res) {

        const project = await Project.findOneAndUpdate({ _id: req.params.id }, req.body);

        // para cada req.volunteersParticipated, update user no campo volunteerParticipated
        console.log("req.volunteersParticipated", req.body.volunteersParticipated)
        for (let count = 0; count < req.body.volunteersParticipated.length; count++) {
            console.log("req.volunteersParticipated[count]", req.body.volunteersParticipated[count])
            const userEncontrado = await User.findOne({ _id: req.body.volunteersParticipated[count] });
            userEncontrado.volunteerParticipated.push(req.params.id);
            await User.findOneAndUpdate({ _id: userEncontrado }, {volunteerParticipated: userEncontrado.volunteerParticipated});
            console.log("userEncontrado", userEncontrado)
        }

        return res.json(project)
    }
}