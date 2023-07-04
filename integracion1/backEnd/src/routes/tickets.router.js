const { Router } = require('express')
const { getTicket, getTicketById, createTicket, updateTicket, purchaseTicket } = require('../controllers/tickets.controller')
const router = Router()

router.get("/", getTicket)
router.get("/:tid", getTicketById)
router.post("/", createTicket)
router.put("/:tid", updateTicket)
router.post('/:tid/purchase', purchaseTicket)
// router.post("/:tid/product/:pid", )
// router.delete("/:tid", )
// router.delete("/:tid/product/pid", )

module.exports = router