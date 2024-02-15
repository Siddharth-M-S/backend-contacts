const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
//@desc Register a user
//@route POST/api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    res.status(400)
    throw new Error('All fields are mandatory')
  }
  const userAvailable = await User.findOne({ email })
  if (userAvailable) {
    res.status(400)
    throw new Error('User aldready registered')
  }
  const hashPaswword = await bcrypt.hash(password, 10)
  console.log(hashPaswword)
  const user = await User.create({
    username,
    email,
    password: hashPaswword,
  })
  console.log(`user created ${user}`)
  if (!user) {
    res.status(400)
    throw new Error('User data is not valid')
  } else {
    res.status(201).json({
      _id: user.id,
      email: user.email,
    })
  }

  //   res.json({ message: 'Register the user' })
})
//@desc Register a user
//@route POST/api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Login user' })
})

//@desc Register a user
//@route POST/api/users/current
//@access public
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Current user information' })
})
module.exports = {
  registerUser,
  loginUser,
  currentUser,
}
