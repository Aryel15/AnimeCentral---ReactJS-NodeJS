import UserController from '../Controller/UserController.js'
import express from 'express'

const UserRoutes = express.Router();

UserRoutes.post('/user/', UserController.createUser)
UserRoutes.post('/user/login', UserController.login)

export default UserRoutes;