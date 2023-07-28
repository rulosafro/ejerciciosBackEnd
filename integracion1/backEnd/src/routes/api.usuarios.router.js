const { Router } = require('express')
const userController = require('../controllers/users.controller')

const router = Router()

router.get('/', userController.getUsers)
router.get('/:uid', userController.getUserById)

router.post('/', userController.createUser)

router.put('/:uid', userController.updateUser)
router.put('/premium/:uid', userController.changeUserPremium)

router.delete('/:uid', userController.deleteUser)

module.exports = router
