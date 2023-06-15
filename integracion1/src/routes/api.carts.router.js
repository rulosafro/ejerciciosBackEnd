const { Router } = require("express")
const { getCarts, getCartsById, createCarts, updateCarts, deleteCart, deleteProductOnCart, putProductOnCarts } = require("../controllers/carts.controller")

const router = Router()

router.get("/", getCarts)
router.get("/:cid", getCartsById)
router.post("/", createCarts)
router.put("/:cid", updateCarts)
router.post("/:cid/product/:pid", putProductOnCarts)
router.delete("/:cid", deleteCart)
router.delete("/:cid/product/pid", deleteProductOnCart)

module.exports = router
