const express = require("express")
const router = express.Router()

const accountController = require("./../controllers/accountController")
router.post("/register",(req, res)=>{
    accountController.registerPassenger(req, res)
})
router.post("/getId",(req, res)=>{
    accountController.getId(req,res)
})
router.post("/login",(req, res)=>{
    accountController.getId(req, res)
})

module.exports = router