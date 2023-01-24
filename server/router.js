const express = require('express')

const routes = express.Router()

const UserController = require('./controllers/Users')

routes.get('/users', UserController.read)
routes.post('/users', UserController.create)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

module.exports = routes