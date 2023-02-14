const express = require("express")
const { con } = require("../DbConnection")
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