const express = require('express');
const routes = express.Router();
const auth = require('./config/auth');

const userController = require('./controllers/UserController');
const authController = require('./controllers/AuthController');
const projectController = require('./controllers/ProjectController');


routes.post('/cadastro', userController.cadastro);

routes.post('/login', authController.login);

routes.post('/newProject', auth, projectController.store)
routes.get('/projects/', auth, projectController.showAll)
routes.get('/project/:id', auth, projectController.showId)
routes.put('/project/:id', auth, projectController.update)
routes.delete('/project/:id', auth, projectController.delete)

routes.put('/project/signup/:id', auth, projectController.signup); // Inscreve usuário no projeto


module.exports = routes;
