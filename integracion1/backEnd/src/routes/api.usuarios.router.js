const { Router } = require('express')
const passportCall = require('../middlewares/passportCall')
const { authorization } = require('../middlewares/authorizationJwtRole')
const userController = require('../controllers/users.controller')

const router = Router()

router.get('/', userController.getUsers)
router.get('/:uid', userController.getUserById)

router.post('/', userController.createUser)

router.put('/:uid', userController.updateUser)
router.put('/premium/:uid', userController.changeUserPremium)

router.delete('/:uid', userController.deleteUser)

module.exports = router
