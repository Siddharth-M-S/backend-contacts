const { emit } = require('nodemon')
const asyncHandler = require('express-async-handler')
const contact = require('../models/contactModel')
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await contact.find({ user_id: req.user.id })
  res.status(200).json(contacts)
})
const getContact = asyncHandler(async (req, res) => {
  const contacts = await contact.findById(req.params.id)

  if (!contacts) {
    res.status(404)
    throw new Error('Contact not found')
  }

  res.status(200).json(contacts)
})

const addContact = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { name, email, phone } = req.body
  if (!name || !email || !phone) {
    res.status(400)
    throw new Error('All fields are mandatory')
  }
  console.log(req.user)
  const contacts = await contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  })
  console.log(contacts.user_id)
  res.status(201).json(contacts)
})

const UpdateContact = asyncHandler(async (req, res) => {
  const contacts = contact.findById(req.params.id)
  console.log(req)
  if (!contacts) {
    // console.log(contacts)
    res.status(404)
    throw new Error('Contact not found')
  }
  // console.log(contacts.user_id.toString())
  // console.log(req.user.id)
  if (contacts.user_id.toString() !== req.user.id) {
    res.status(403)
    throw new Error("User don't have permission to update other user contacts")
  }
  // eslint-disable-next-linno-underscore-dangle
  const updatedcontacts = await contact.findByIdAndUpdate(
    req.params.id,
    req.body, ///
    {
      new: true,
    }
  )

  console.log('updated contacts process')
  res.status(200).json(updatedcontacts)
})

const deleteContact = asyncHandler(async (req, res) => {
  const contacts = await contact.findById(req.params.id)
  // console.log(contacts + '  i')
  if (!contacts) {
    res.status(404)
    throw new Error('Contact not found')
  }
  if (contacts.user_id.toString() !== req.user.id) {
    res.status(403)
    throw new Error("User don't have permission to delete other user contacts")
  }
  // console.log('vantu')
  await contacts.deleteOne({ _id: req.params.id })
  res.status(200).json(contacts)
})

module.exports = {
  getContact,
  getContacts,
  UpdateContact,
  deleteContact,
  addContact,
}
