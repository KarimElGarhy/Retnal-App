import { Router } from 'express'
import {
  createUser,
  deleteUser,
  findUser,
  findUsers,
  idChecker,
  mailChecker,
  signIn,
  updateUser,
} from './user.controllers.js'

const userRoutes = Router()

userRoutes.use('/sign-up', mailChecker)
userRoutes.use('/:id', idChecker)

userRoutes.post('/sign-up', createUser)
userRoutes.post('/sign-in', signIn)
userRoutes.get('/:id', findUser)
userRoutes.put('/:id', updateUser)
userRoutes.delete('/:id', deleteUser)
userRoutes.get('/', findUsers)

export default userRoutes
