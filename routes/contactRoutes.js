const express = require('express')
const router = express.Router()
const {
  getContacts,
  getContact,
  UpdateContact,
  deleteContact,
  addContact,
} = require('../controller/contactController')
router.route('/').get(getContacts).post(addContact)
router.route('/:id').get(getContact).delete(deleteContact).put(UpdateContact)
// router.route()

module.exports = router

/*
router.route('/:id').get((req, res) => {
  res.status(200).json({
    message: `Get contact for ${req.params.id}`,
  })
})
router.route('/').post((req, res) => {
  res.status(200).json({
    message: 'create contact',
  })
})
router.route('/:id').put((req, res) => {
  res.status(200).json({
    message: `Update contact for ${req.params.id}`,
  })
})
router.route('/:id').delete((req, res) => {
  res.status(200).json({
    message: `Delete contact for ${req.params.id}`,
  })
})
module.exports = router
*/
