const dbConnection = require("../dbConnection.js").con
const ShortUniqueId = require('short-unique-id');

exports.requestDelivery=async(req, res)=>{
    const tripData = req.body.data
    const actualPrice = req.body.actualPrice
    const transactionNumber = new ShortUniqueId({length:8})

    const toInsert= [
        transactionNumber(),
        tripData.passengerId,
        tripData.time,
        tripData.origin,
        tripData.destination,
        tripData.distance,
        actualPrice,
        JSON.stringify(tripData.coords),
        tripData.largeLuggage,
        tripData.mediumLuggage,
        tripData.smallLuggage,
    ]
    let sql = "INSERT INTO delivery (`transaction_id`,`passenger`, `pickup_time`, `origin`, `destination`,distance, price, coords,large_luggage,medium_luggage, small_luggage  ) VALUES(?,?,?,?,?,?,?,?,?,?,?)"

    dbConnection.query(sql, toInsert,(err, result)=>{
        if(err){
            console.log(err)
            res.send({success:false})
        }
        if(!result.insertId)return res.send({success:false})

        return res.send({success:true})
    })
    return console.log(req.body)
}
exports.requestRide=(req, res)=>{
    const tripData = req.body.data
    const transactionNumber = new ShortUniqueId({length:8})
 
    let sql = "INSERT INTO hailings (`transaction_id`,`passenger`, `pickup_time`, `origin`, `destination`,distance, num_passenger, price, coords  ) VALUES(?,?,?,?,?,?,?,?,?)"

    const toInsert= [
        transactionNumber(),
        tripData.passengerId,
        tripData.time,
        tripData.origin,
        tripData.destination,
        tripData.distance,
        tripData.numPassenger,
        tripData.price,
        JSON.stringify(tripData.coords)
    ]
    dbConnection.query(sql, toInsert,(err, result)=>{
        if(err){
            console.log(err)
            res.send({success:false})
        }
        if(!result.insertId)return res.send({success:false})

        return res.send({success:true})
    })
}

exports.getDeliveries = (req, res) => {
    const accountId = req.body.accountId

    const sql = "SELECT passengers.firstname, passengers.middlename, passengers.lastname, delivery.id,delivery.transaction_id, delivery.pickup_time, delivery.origin, delivery.destination,delivery.status, date_format(delivery.date_time,'%M %d %Y, %hh:%mm') as date_time, delivery.large_luggage, delivery.medium_luggage, delivery.small_luggage, delivery.price, delivery.distance FROM `delivery` INNER JOIN passengers on delivery.passenger = passengers.id WHERE delivery.passenger = ? ORDER BY delivery.date_time;"
    dbConnection.query(sql, accountId,(err, result)=>{
        if(err){
            console.log(err)
            throw err
        }
        res.send(result)
    })
}
exports.getHailings = (req, res) => {
    const passengerId = req.body.passengerId

    const sql = "SELECT passengers.firstname, passengers.middlename, passengers.lastname, hailings.id, hailings.transaction_id, hailings.pickup_time, hailings.origin, hailings.destination,hailings.status, date_format(hailings.date_time,'%M %d %Y, %hh:%mm') as date_time, hailings.price, hailings.distance FROM `hailings` INNER JOIN passengers on hailings.passenger = passengers.id WHERE hailings.passenger = ? ORDER BY hailings.date_time DESC;"
    dbConnection.query(sql, passengerId,(err, result)=>{
        if(err){
            console.log(err)
            throw err
        }
        res.send(result)
    })
}
exports.cancelDelivery = (req, res) => { 
    const tripId = req.body.tripId
    const sql = "DELETE FROM delivery WHERE id = ?"

    dbConnection.query(sql, tripId, (err, result)=>{
        if(err){
            console.log(err)
            return res.send({success:false})
        }
        res.send({success:true})
})
}
exports.cancelHail = (req, res) => { 
    const tripId = req.body.tripId


    const sql = "DELETE FROM hailings WHERE id = ?"

    dbConnection.query(sql, tripId, (err, result)=>{
        if(err){
            console.log(err)
            return res.send({success:false})
        }
        res.send({success:true})
})
}
exports.getDeliveryDetails = (req, res) => {
    const tripId = req.body.tripId

    const sql = "SELECT passengers.firstname, passengers.middlename, passengers.lastname, delivery.price, delivery.id, delivery.small_luggage, delivery.medium_luggage, delivery.large_luggage, delivery.pickup_time, delivery.origin, delivery.destination,delivery.status,delivery.distance, date_format(delivery.date_time,'%M %d %Y, %hh:%mm') as date_time FROM `delivery`, `trips` INNER JOIN passengers on trips.driver = passengers.id WHERE delivery.id = ?;"
    dbConnection.query(sql, tripId,(err, result)=>{
        if(err){
            res.send({success:false})
            throw err
        }
        res.send(result[0])
    })
}
exports.getHailingDetails = (req, res) => {
    const tripId = req.body.tripId

    const sql = "SELECT passengers.firstname, passengers.middlename, passengers.lastname, hailings.id, hailings.pickup_time, hailings.origin, hailings.destination,hailings.status, date_format(hailings.date_time,'%M %d %Y, %hh:%mm') as date_time,hailings.price, hailings.distance, hailings.num_passenger FROM `hailings`,`trips` INNER JOIN passengers on trips.driver = passengers.id WHERE hailings.id = ?;"
    dbConnection.query(sql, tripId,(err, result)=>{
        if(err){
            res.send({success:false})
            throw err
        }
        res.send(result[0])
    })
}
exports.getNotification = (req, res) => {
    const accountId = req.body.accountId

    const sql = "SELECT trips.*, notification.status as notif_status, notification.seen, notification.id as notif_id FROM trips INNER JOIN notification ON trips.service_id = notification.trip_id WHERE notification.user_id = ? GROUP BY notification.id ORDER BY notification.id DESC;"
    dbConnection.query(sql, accountId,(err, result)=>{
        if(err){
            console.log(err)
            throw err
        }
        res.send(result)
    })
}
exports.countNotifs = (req, res) => {
    const accountId = req.body.accountId

    const sql = "SELECT COUNT(notification.id) as count FROM notification WHERE notification.user_id = ? AND notification.seen = 0 ORDER BY notification.id DESC;"
    dbConnection.query(sql, accountId,(err, result)=>{
        if(err){
            console.log(err)
            throw err
        }
        res.send(result)
    })
}
exports.seeNotificaton = (req, res)=>{
    const notifId = req.body.notifId
    console.log("notification",notifId)

    const sql = "UPDATE notification SET seen = 1 WHERE id=?"
    dbConnection.query(sql, notifId,(err, result)=>{
        if(err){
            res.send({success:false})
            return console.log(err)
        }
    })
}