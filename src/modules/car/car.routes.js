import { Router } from 'express'
import {
  addCar,
  deleteCar,
  findAllCars,
  findCar,
  searchCarModel,
  searchCarModelAndAvailable,
  updateCar,
} from './car.controllers.js'

const carRouter = Router()

carRouter.post('/', addCar)
carRouter.get('/', findAllCars)
carRouter.get('/search', searchCarModel)
carRouter.get('/search-and-availability', searchCarModelAndAvailable)
carRouter.get('/:id', findCar)
carRouter.put('/:id', updateCar)
carRouter.delete('/:id', deleteCar)

export default carRouter
