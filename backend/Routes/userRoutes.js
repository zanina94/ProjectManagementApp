const express = require("express")
const {Register,Login, GetAllUsers} = require("../Controllers/userController")


const router = express.Router()

router.post('/register',Register)
router.post('/login',Login)
router.get('/getAllUsers',GetAllUsers)

module.exports = router