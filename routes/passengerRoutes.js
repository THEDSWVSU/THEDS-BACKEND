const express = require("express")
const router = express.Router()

const passengerController = require("./../controllers/passengerController")
router.post("/",(req, res)=>{
})

router.post("/requestDelivery",(req, res)=>{
    passengerController.requestDelivery(req, res)
})
router.post("/requestRide",(req, res)=>passengerController.requestRide(req, res))
router.post("/getTripDetails/delivery", (req, res)=>passengerController.getDeliveryDetails(req, res))
router.post("/getTripDetails/service", (req, res)=>passengerController.getHailingDetails(req, res))
router.post("/getHailings",(req, res)=>passengerController.getHailings(req, res))
router.post("/getDeliveries",(req, res)=>{
    passengerController.getDeliveries(req, res)
})
router.post("/seeNotificaton",(req, res)=>passengerController.seeNotificaton(req, res))
router.post("/cancelDelivery",(req, res)=>passengerController.cancelDelivery(req, res))
router.post("/cancelHail",(req, res)=>passengerController.cancelHail(req, res))

router.post("/countNotifs",(req, res)=>passengerController.countNotifs(req, res))

router.post("/getNotification",(req, res)=>passengerController.getNotification(req, res))

module.exports = router