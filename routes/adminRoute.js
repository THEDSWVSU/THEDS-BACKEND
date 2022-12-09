const express = require("express")
const router = express.Router()

const adminController = require("./../controllers/adminController")

router.get("/getDrivers",(req, res)=>{
    adminController.getDrivers(req,res)
})
router.post("/acceptDriver",(req, res)=>{
    adminController.acceptDriver(req, res)
})
router.post("/declineDriver",(req, res)=>{
    adminController.declineDriver(req, res)
})

module.exports = router