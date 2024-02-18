const express = require("express")
const { con } = require("../dbConnection")
const router = express.Router()

const adminController = require("./../controllers/adminController")
const driverController = require("./../controllers/driverController")

router.get("/getDrivers",(req, res)=>{
    adminController.getDrivers(req,res)
})
router.get("/driver-trips-per-day", driverController.driverTripsPerDay)

router.post("/acceptDriver",(req, res)=>{
    adminController.acceptDriver(req, res)
})
router.post("/declineDriver",(req, res)=>{
    adminController.declineDriver(req, res)
})
router.post("/login",(req, res)=>{
    adminController.login(req, res)
    
})
router.post("/changePassword",(req, res)=>{
    adminController.changePassword(req, res)
    
})
router.post("/deactivateDriver",(req, res)=>{
    adminController.deactivateDriver(req, res)
    
})
router.post("/activateDriver",(req, res)=>{
    adminController.activateDriver(req, res)
    
})
module.exports = router
