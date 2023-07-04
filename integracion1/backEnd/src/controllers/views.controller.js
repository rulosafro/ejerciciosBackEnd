const { productModel } = require("../Daos/mongo/models/product.model")
const { userModel } = require("../Daos/mongo/models/user.model")
const { cartService } = require("../service/index.service")

class OrdersController {
  viewsUsers = async (req, res) => {
    try {
      const { page = 1 } = req.query
      let users2 = await userModel.paginate({}, { limit: 10, page: page, lean: true })
      const { docs, hasPrevPage, hasNextPage, prevPage, nextPage } = users2
      res.status(200).render("users", {
        status: "success",
        data: docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
      })
    } catch (error) {
      console.log(error)
    }
  }

  viewsProducts = async (req, res) => {
    try {
      let { pages = 1, limit = 10, sort = 1, query } = req.query

      if (!query) {
        query = {}
      } else {
        query = { title: `Producto ${query}` }
      }

      const products2 = await productModel.paginate(query, {
        limit: limit,
        page: pages,
        sort: {
          price: sort,
        },
        lean: true,
      })
      const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages, page } = products2

      const prevLink = hasPrevPage ? `http://localhost:8080/views/products?page=${prevPage}&limit=${limit}&query=${query}&sort=${sort}` : null
      const nextLink = hasNextPage ? `http://localhost:8080/views/products?page=${nextPage}&limit=${limit}&query=${query}&sort=${sort}` : null

      console.log(req.user)
      const dataUser = req.user

      res.status(200).render("products", {
        status: "success",
        payload: docs,
        totalPages,
        page,
        prevPage,
        nextPage,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
        dataUser,
      })
    } catch (error) {
      console.log({ status: "error", error })
    }
  }

  viewsRealTime = (req, res) => {
    res.render("realTimeProducts", {})
  }

  viewsCarts = async (req, res) => {
    try {
      const carts = await cartService.get()
      res.status(200).render("carts", { carts })
    } catch (error) {
      console.log(error)
    }
  }

  viewsMyCart = async (req, res) => {
    try {
      const { cid } = req.params
      let carrito = await cartService.getByID(cid)
      if (!carrito) {
        res.status(404).send("ID no identificado")
      }
      // let shop = carrito.products
      console.log(carrito)
      res.status(200).render("cartsById", { carrito, cid })
    } catch (error) {
      console.log(error)
    }
  }

  viewsRegister = (req, res) => {
    res.status(200).render("registerForm", {})
  }

  viewsLogin = (req, res) => {
    res.status(200).render("login", {})
  }

  viewsLogout = async (req, res) => {
    try {
      res.clearCookie("coderCookieToken").clearCookie("connect.sid").redirect("/views/products")
    } catch (error) {
      console.log(error)
    }
  }

  viewsUpload = (req, res) => {
    try {
      res.send({
        status: "success",
        mensaje: "Archivo subido ",
      })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new OrdersController()
