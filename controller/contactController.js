const { emit } = require('nodemon')
const asyncHandler = require('express-async-handler')
const contact = require('../models/contactModel')
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await contact.find()
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
const UpdateContact = asyncHandler(async (req, res) => {
  const contacts = contact.findById(req.params.id)
  if (!contacts) {
    console.log(contacts)
    res.status(404)
    throw new Error('Contact not found')
  }
  const updatedcontacts = await contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )

  res.status(200).json(updatedcontacts)
})
const addContact = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { name, email, phone } = req.body
  if (!name || !email || !phone) {
    res.status(400)
    throw new Error('All fields are mandatory')
  }
  const contacts = await contact.create({
    name,
    email,
    phone,
  })
  res.status(201).json(contacts)
})
const deleteContact = asyncHandler(async (req, res) => {
  const contacts = await contact.findById(req.params.id)
  // console.log(contacts + '  i')
  if (!contacts) {
    res.status(404)
    throw new Error('Contact not found')
  }
  // console.log('vantu')
  await contacts.deleteOne()
  res.status(200).json(contacts)
})

module.exports = {
  getContact,
  getContacts,
  UpdateContact,
  deleteContact,
  addContact,
}
