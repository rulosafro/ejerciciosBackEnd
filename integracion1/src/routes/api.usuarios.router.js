const { Router } = require("express")
const passportCall = require("../middlewares/passportCall")
const { authorization } = require("../middlewares/authorizationJwtRole")
const userController = require("../controllers/users.controller")

const router = Router()

router.get("/", passportCall("jwt"), authorization("admin"))
router.get("/", userController.getUsers)
router.get("/:uid", userController.getUsersById)
router.post("/", userController.createUsers)
router.put("/:uid", userController.updateUsers)
router.delete("/:uid", userController.deleteUsers)

module.exports = router
