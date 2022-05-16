const express = require('express');
const routes = express.Router();
const auth = require('./config/auth');

const userController = require('./controllers/UserController');
const authController = require('./controllers/AuthController');
const projectController = require('./controllers/ProjectController');

const causeController = require('./controllers/CauseController');

const adminController = require('./controllers/AdminController')

routes.post('/register', userController.cadastro);
routes.post('/login', authController.login);

// Admin routes
routes.post('/registerAdmin', adminController.cadastro);
routes.post('/loginAdmin', authController.loginAdmin);


routes.post('/newProject', auth, projectController.store)
routes.get('/projects/', auth, projectController.showAll)
routes.get('/project/:id', auth, projectController.showId)
routes.get('/projects/filter', auth, projectController.filter)
routes.put('/project/:id', auth, projectController.update)
routes.delete('/project/:id', auth, projectController.delete)
routes.get('/project/user/:id', projectController.showPerUser);
routes.put('/project/signup/:id', auth, projectController.signup); // Inscreve usuário no projeto

// Causes
routes.post('/cause', causeController.store);
routes.get('/cause', causeController.showAll);


module.exports = routes;
