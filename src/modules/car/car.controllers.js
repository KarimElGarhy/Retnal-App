import { isValidObjectId } from 'mongoose'
import Car from '../../../models/car.model.js'

const addCar = async (req, res) => {
    const car = await Car.create(req.body)
    res.status(201).json({
        message: 'Car add successfully',
        data: car,
        success: true,
    })
}

const findAllCars = async (req, res) => {
    let cars = await Car.find()
    if (!cars) {
        return res
            .status(400)
            .json({ message: 'Cars does not exist', success: false })
    }
    res.status(200).json({
        message: 'Cars find successfully',
        data: cars,
        success: true,
    })
}

const findCar = async (req, res) => {
    const car = await Car.findById(req.params.id)

    if (!car) {
        return res
            .status(400)
            .json({ message: 'Car does not exist', success: false })
    }

    res.status(200).json({
        message: 'Car find successfully',
        data: car,
        success: true,
    })
}

const updateCar = async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res
            .status(400)
            .json({ message: 'Car does not exist', success: false })
    }
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json({
        message: 'Car update successfully',
        data: car,
        success: true,
    })
}

const deleteCar = async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res
            .status(400)
            .json({ message: 'Car does not exist', success: false })
    }
    const car = await Car.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Car delete successfully', success: true })
}

const searchCarModel = async (req, res) => {
    const { model } = req.query
    const cars = await Car.find({ model: model })
    if (cars.length <= 0) {
        return res
            .status(400)
            .json({ message: 'Cars does not exist', success: false })
    }
    res.status(200).json({
        message: 'Cars find successfully',
        data: cars,
        success: true,
    })
}

const searchCarModelAndAvailable = async (req, res) => {
    const { model, availability } = req.query
    const cars = await Car.find({ model: model, availability: availability })
    if (cars.length <= 0) {
        return res
            .status(400)
            .json({ message: 'Cars does not exist', success: false })
    }
    res.status(200).json({
        message: 'Cars find successfully',
        data: cars,
        success: true,
    })
}

export {
    addCar,
    findAllCars,
    findCar,
    updateCar,
    deleteCar,
    searchCarModel,
    searchCarModelAndAvailable,
}
