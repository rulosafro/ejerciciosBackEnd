const { Router } = require('express')
const { getTicket, getTicketById, createTicket, updateTicket, purchaseTicket } = require('../controllers/tickets.controller')
const { passportCall } = require('../middlewares/passportCall')
const { authorization } = require('../middlewares/authorizationJwtRole')
const router = Router()

const midAdmin = [passportCall('jwt'), authorization('admin')]
const midJWT = [passportCall('jwt')]

router.get('/', getTicket)
router.get('/:tid', getTicketById)

router.post('/:cid', midJWT, createTicket)
router.post('/:cid/purchase', midJWT, purchaseTicket)

router.put('/:tid', midAdmin, updateTicket)

// router.post("/:tid/product/:pid", )
// router.delete("/:tid", )
// router.delete("/:tid/product/pid", )

module.exports = router
