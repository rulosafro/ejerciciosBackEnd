const { Router } = require('express')
const { getSession } = require('../controllers/api.session.controller')

const router = Router()

router.get('/', getSession)

module.exports = router
