import mongoose, { model, Schema } from 'mongoose'

const schema = new Schema({
  rentalStartDate: {
    type: Date,
    required: true,
  },
  rentalReturnDate: {
    type: Date,
    required: true,
  },
  rentalUser: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    
  },
  rentalCar: {
    type: mongoose.Types.ObjectId,
    ref: 'Car',
  },
})

const Rental = model('Rental', schema)
export default Rental
