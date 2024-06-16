import { model, Schema } from 'mongoose'

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
      lowercase: true,
    },
    availability: {
      type: Boolean, // True => Available , False =>Rented
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const Car = model('Car', schema)
export default Car
