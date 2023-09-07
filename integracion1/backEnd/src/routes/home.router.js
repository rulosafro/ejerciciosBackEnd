const { Router } = require('express')
const { getHome } = require('../controllers/home.controller')
const { passportCall } = require('../middlewares/passportCall')

const router = Router()

const midJWT = [passportCall('jwt')]

router.get('/', midJWT, getHome)

module.exports = router
