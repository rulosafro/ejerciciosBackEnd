const { Router } = require('express')
const { getContacts, createContacts } = require('../controllers/contacts.controller')
const router = Router()

router.get('/', getContacts)

router.post('/', createContacts)

module.exports = router
