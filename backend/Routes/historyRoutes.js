const express = require("express")
const { GetAllProjectsHistories, GetAllHistories } = require("../Controllers/historyController")



const router = express.Router()

router.get('/getAllProjectsHistories',GetAllProjectsHistories)
router.get('/getAllHistories',GetAllHistories)


module.exports = router