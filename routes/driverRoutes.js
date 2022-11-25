const express = require("express")
const router = express.Router()

const driverController = require("./../controllers/driverController")

router.post("/register",(req, res)=>{
    driverController.register(req,res)
})
router.post("/login", (req, res)=>{
    driverController.login(req, res)
})
router.post("/getTripDetails/delivery", (req, res)=>driverController.getDeliveryDetails(req, res))
router.post("/getTripDetails/service", (req, res)=>driverController.getHailingDetails(req, res))

router.post("/acceptTrip",(req,res)=>driverController.acceptTrip(req, res))
router.post("/getQue",(req, res)=>driverController.getQue(req, res))
router.get("/deliveryFeeds",(req, res)=>{
    driverController.getFeeds(req, res)
})
router.get("/getHailings",(req, res)=>{
    driverController.getHailings(req, res)
})

module.exports = router