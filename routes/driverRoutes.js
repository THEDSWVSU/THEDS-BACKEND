const express = require("express")
const router = express.Router()

const driverController = require("./../controllers/driverController")

router.post("/register",(req, res)=>{
    driverController.register(req,res)
})
router.post("/login", (req, res)=>{
    driverController.login(req, res)
})

module.exports = router