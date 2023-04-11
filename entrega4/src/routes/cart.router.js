const { Router } = require("express")

const router = Router()

//! Add routes {id autogenerado, products[]}
router.get("/", async (req, res) => {
  // await
})

//! Add
router.get("/:cid", async (req, res) => {})

//! Add || El carrito solo debe contener el id del producto y cantidad. Además si ya existe tiene que aumentar la cantidad
router.post("/:cid/product:pid", async (req, res) => {})

module.exports = router
