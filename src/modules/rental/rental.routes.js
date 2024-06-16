import { Router } from 'express'
import {
  createRental,
  deleteRental,
  findAllRentals,
  findOneRentals,
  updateRental,
} from './rental.controllers.js'

const rentalRoutes = Router()

rentalRoutes.post('/', createRental)
rentalRoutes.get('/', findAllRentals)
rentalRoutes.get('/:id', findOneRentals)
rentalRoutes.put('/:id', updateRental)
rentalRoutes.delete('/:id', deleteRental)

export default rentalRoutes
