const { Router } = require("express")
const { getProducts, getProductsById, createProducts, updateProducts, deleteProducts } = require("../controllers/products.controller.js")

const router = Router()

router.get("/", getProducts)
router.get("/:pid", getProductsById)
router.post("/", createProducts)
router.put("/:pid", updateProducts)
router.delete("/:pid", deleteProducts)

module.exports = router
