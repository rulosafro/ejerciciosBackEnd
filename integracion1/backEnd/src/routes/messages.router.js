const { Router } = require('express')
const { getMessage, getMessageById, createMessage, updateMessage, deleteMessage } = require('../controllers/message.controller')

const router = Router()

router.get('/', getMessage)
router.get('/:mid', getMessageById)
router.post('/', createMessage)
router.put('/:mid', updateMessage)
router.delete('/:mid', deleteMessage)

module.exports = router
