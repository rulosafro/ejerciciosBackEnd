const { Router } = require('express')
const { getUserById, getUsers, createUser, updateUser, changeUserPremium, deleteUser, documentsUser, formData } = require('../controllers/users.controller')
const { uploader } = require('../utils/multer')
const { passportCall } = require('../middlewares/passportCall')
const { authorization } = require('../middlewares/authorizationJwtRole')

const router = Router()

const midUser = [passportCall('jwt'), authorization('user')]
const midAdmin = [passportCall('jwt'), authorization('admin')]

router.get('/', getUsers)
router.get('/:uid', getUserById)

router.post('/', midUser, createUser)
router.post('/:uid/documents', midUser, uploader.fields([{ name: 'profile', maxCount: 1 }, { name: 'product' }, { name: 'document' }]), documentsUser)
// req.files is an object (String -> Array) where fieldname is the key, and the value is array of file

router.put('/:uid', midAdmin, updateUser)
router.put('/premium/:uid', midAdmin, changeUserPremium)

router.delete('/:uid', midAdmin, deleteUser)

module.exports = router
