const express = require("express")
const router = express.Router()

const passengerController = require("./../controllers/passengerController")
router.post("/register",(req, res)=>{
    passengerController.registerPassenger(req, res)
})

module.exports = router