const express = require("express")
const router = express.Router()
const { authUser, userVerify, userLogout, userDelete } = require("../controllers/authController")

router.route("/auth").post(authUser)
router.route("/auth/:id").get(userVerify)
router.route("/auth/logout").post(userLogout)
router.route("/user/delete").delete(userDelete)

module.exports = router