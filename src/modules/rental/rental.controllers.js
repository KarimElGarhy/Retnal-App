import { isValidObjectId } from 'mongoose'
import Car from '../../../models/car.model.js'
import Rental from '../../../models/rental.model.js'

const createRental = async (req, res) => {
  let rentalCar = await Car.findById(req.body.rentalCar)
  if (rentalCar.availability === false) {
    return res
      .status(400)
      .json({ message: 'Car is not available', success: false })
  }
  rentalCar = await Car.findByIdAndUpdate(req.body.rentalCar, {
    availability: false,
  })

  const rental = await Rental.create(req.body)
  return res.status(200).json({
    message: 'Rental created successfully',
    data: rental,
    success: true,
  })
}

const findAllRentals = async (req, res) => {
  const rentals = await Rental.find()
    .populate('rentalUser', 'name -_id')
    .populate('rentalCar', 'name model -_id')
  return res
    .status(200)
    .json({ message: 'All Rentals', data: rentals, success: true })
}

const findOneRentals = async (req, res) => {
  const rental = await Rental.findById(req.params.id)
    .populate('rentalUser', 'name -_id')
    .populate('rentalCar', 'name model -_id')
  return res.status(200).json({
    message: 'Rental found successfully',
    data: rental,
    success: true,
  })
}

const deleteRental = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res
      .status(400)
      .json({ message: 'Rental does not exist', success: false })
  }
  const rental = await Rental.findById(req.params.id)
  if (!rental) {
    return res
      .status(400)
      .json({ message: 'Rental does not exist', success: false })
  }
  await Rental.findByIdAndDelete(req.params.id)
  return res
    .status(200)
    .json({ message: 'Rental deleted successfully', success: true })
}

const updateRental = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res
      .status(400)
      .json({ message: 'Rental does not exist', success: false })
  }
  const rental = await Rental.findById(req.params.id)
  if (!rental) {
    return res
      .status(400)
      .json({ message: 'Rental does not exist', success: false })
  }
  await Rental.findByIdAndUpdate(req.params.id, req.body)
  return res.status(200).json({
    message: 'Rental updated successfully',
    data: rental,
    success: true,
  })
}

export {
  createRental,
  findAllRentals,
  findOneRentals,
  deleteRental,
  updateRental,
}
