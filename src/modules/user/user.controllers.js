import { isValidObjectId } from 'mongoose'
import User from '../../../models/user.model.js'
import bcrypt from 'bcrypt'

const mailChecker = async (req, res, next) => {
  const { name, email, password } = req.body

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: 'Please fill all the fields', success: false })
  }
  const user = await User.findOne({ email: email })
  if (user) {
    return res

      .status(400)
      .json({ message: 'User already exists', success: false })
  }
  req.userData = { email, password, name }
  next()
}

const idChecker = async (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return res
      .status(400)
      .json({ message: 'User does not exist', success: false })
  }
  next()
}

const createUser = async (req, res) => {
  const { name, email, password } = req.userData
  bcrypt.hash(password, 10, async (err, hash) => {
    let user = await User.create({
      name: name,
      email: email,
      password: hash,
    })
    return res.status(200).json({
      message: 'User created successfully',
      data: user,
      success: true,
    })
  })
}

const signIn = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Please fill all the fields', success: false })
  }
  const user = await User.findOne({ email: email })

  if (!user) {
    return res
      .status(400)
      .json({ message: 'User does not exist', success: false })
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res
        .status(400)
        .json({ message: 'User does not exist', success: false })
    }
    if (result) {
      return res
        .status(200)
        .json({ message: 'User signed in successfully', success: true })
    }
    return res
      .status(400)
      .json({ message: 'User does not exist', success: false })
  })
}

const findUser = async (req, res) => {
  const user = await User.findById(req.params.id, { name: 1, email: 1 })
  if (!user) {
    return res
      .status(400)
      .json({ message: 'User does not exist', success: false })
  }
  return res
    .status(200)
    .json({ message: 'User found successfully', data: user, success: true })
}

const findUsers = async (req, res) => {
  const users = await User.find({}, { name: 1, email: 1 })
  if (!users) {
    return res
      .status(400)
      .json({ message: 'Users does not exist', success: false })
  }
  return res.status(200).json({
    message: 'Users found successfully',
    data: users,
    success: true,
  })
}

const updateUser = async (req, res) => {
  if (req.params.id != req.body._id) {
    return res
      .status(400)
      .json({ message: 'You Can Make this changes !', success: false })
  }
  const user = await User.findById(req.params.id)
  if (!user) {
    return res
      .status(400)
      .json({ message: 'User does not exist', success: false })
  }
  const { name } = req.body
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  )
  return res.status(200).json({
    message: 'User updated successfully',
    data: updatedUser,
    success: true,
  })
}

const deleteUser = async (req, res) => {
  if (req.params.id != req.body._id) {
    return res
      .status(400)
      .json({ message: 'You Can Make this changes !', success: false })
  }
  const user = await User.findById(req.params.id)
  if (!user) {
    return res
      .status(400)
      .json({ message: 'User does not exist', success: false })
  }
  const { name } = req.body
  const deleteUser = await User.findByIdAndDelete(req.params.id)
  return res
    .status(200)
    .json({ message: 'User Deleted successfully', success: true })
}

export {
  createUser,
  signIn,
  findUser,
  findUsers,
  mailChecker,
  updateUser,
  deleteUser,
  idChecker,
}
