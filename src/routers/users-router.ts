import express from 'express'
import UserControllers from '../controllers/users-controllers'

const usersRouter = express.Router()

usersRouter.post("/login", UserControllers.login)

export default usersRouter