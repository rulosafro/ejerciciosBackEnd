const { Router } = require("express")
const { CartManager } = require("../managerDaos/CartManager")

const router = Router()
const cartManager = new CartManager()

//// Add routes {id autogenerado, products[]}
router.post("/", async (req, res) => {
  try {
    const cart = req.body
    const cartAgregado = await cartManager.createCart(cart)
    const carts = await cartManager.getCarts()
    res.status(200).send({ carts })
  } catch (error) {
    console.log(error)
  }
})

//// Add
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params
    const cart = await cartManager.getCartById(parseInt(cid))
    res.status(200).send({ cid, cart })
  } catch (error) {
    console.error(error)
  }
})

//! Add || El carrito solo debe contener el id del producto y cantidad. Además si ya existe tiene que aumentar la cantidad
router.post("/:cid/product:pid", async (req, res) => {})

module.exports = router
