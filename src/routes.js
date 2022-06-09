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

// User routes
routes.get('/user/:id', auth, userController.showId) // user id
routes.put('/user/:id', auth, userController.update) // edit user
routes.get('/changeToken/:id', auth, userController.changeToken);

// Admin routes
routes.post('/registerAdmin', adminController.cadastro);
routes.post('/loginAdmin', authController.loginAdmin);
routes.get('/admins', adminController.showAll); // get all admins
routes.get('/admin/:id', adminController.showId); // get 1 admin
routes.put('/admin/:id', auth, adminController.update) // edit admin
routes.delete('/admin/:id', auth, adminController.delete) // delete admin

// Project routes
routes.post('/newProject', auth, projectController.store)
routes.get('/projects/', projectController.showAll)
routes.get('/project/:id', auth, projectController.showId)
routes.get('/projects/filter', auth, projectController.filter)
routes.put('/project/:id', auth, projectController.update)
routes.put('/projects/:id', projectController.update) //update do login (sem autorização)
routes.delete('/project/:id', auth, projectController.delete)
routes.get('/project/user/:id', projectController.showPerUser);
routes.put('/project/signup/:id', auth, projectController.signup); // Inscreve usuário no projeto
routes.put('/attendance/:id', auth, projectController.attendance); // Marca presença no projeto

// Causes
routes.post('/cause', causeController.store);
routes.get('/cause', causeController.showAll);

// Post de projeto
routes.post('/newPost/:id', auth, projectController.newPost)


module.exports = routes;
