const dbConnection = require("../dbConnection.js").con

exports.requestDelivery=(req, res)=>{
    const origin = req.body.origin
    const destination = req.body.destination
    const pakage = req.body.pakage
    const time = req.body.time
    const passengerId =  req.body.passengerId

    console.log("Request body",req.body)

 
    let sql = "INSERT INTO delivery (`pakage`,`pickup_time`,`origin`,`destination`, `passenger_id`) VALUES(?,?,?,?,?)"

    dbConnection.query(sql, [pakage, time, origin, destination, passengerId],(err, result)=>{
        if(err){
            console.log(err)
            res.send({success:false})
        }
        console.log(result)
        if(!result.insertId)return res.send({success:false})

        return res.send({success:true})
    })
}
exports.requestRide=(req, res)=>{
    const origin = req.body.origin
    const destination = req.body.destination
    const time = req.body.time
    const passengerId =  req.body.passengerId
 
    let sql = "INSERT INTO hailings (`passenger`, `pickup_time`, `origin`, `destination`) VALUES(?,?,?,?)"

    dbConnection.query(sql, [passengerId, time, origin, destination],(err, result)=>{
        if(err){
            console.log(err)
            res.send({success:false})
        }
        console.log(result)
        if(!result.insertId)return res.send({success:false})

        return res.send({success:true})
    })
}

exports.getDeliveries = (req, res) => {
    const accountId = req.body.accountId

    const sql = "SELECT passengers.firstname, passengers.middlename, passengers.lastname, delivery.id, delivery.pakage, delivery.pickup_time, delivery.origin, delivery.destination,delivery.status, date_format(delivery.date_time,'%M %d %Y, %hh:%mm') as date_time FROM `delivery` INNER JOIN passengers on delivery.passenger_id = passengers.id WHERE delivery.status = 'pending' and delivery.passenger_id = ?;"
    console.log("AccountId",accountId)
    dbConnection.query(sql, accountId,(err, result)=>{
        if(err){
            console.log(err)
            throw err
        }
        console.log(result)
        res.send(result)
    })
}
exports.getHailings = (req, res) => {
    const passengerId = req.body.passengerId

    const sql = "SELECT passengers.firstname, passengers.middlename, passengers.lastname, hailings.id, hailings.pickup_time, hailings.origin, hailings.destination,hailings.status, date_format(hailings.date_time,'%M %d %Y, %hh:%mm') as date_time FROM `hailings` INNER JOIN passengers on hailings.passenger = passengers.id WHERE hailings.status = 'pending' and hailings.passenger = ?;"
    dbConnection.query(sql, passengerId,(err, result)=>{
        if(err){
            console.log(err)
            throw err
        }
        console.log(result)
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
        console.log(result)
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
        console.log(result)
        res.send({success:true})
})
}
exports.getDeliveryDetails = (req, res) => {
    const tripId = req.body.tripId

    const sql = "SELECT passengers.firstname, passengers.middlename, passengers.lastname, delivery.id, delivery.pakage, delivery.pickup_time, delivery.origin, delivery.destination,delivery.status, date_format(delivery.date_time,'%M %d %Y, %hh:%mm') as date_time FROM `delivery`, `trips` INNER JOIN passengers on trips.driver = passengers.id WHERE delivery.id = ?;"
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

    const sql = "SELECT passengers.firstname, passengers.middlename, passengers.lastname, hailings.id, hailings.pickup_time, hailings.origin, hailings.destination,hailings.status, date_format(hailings.date_time,'%M %d %Y, %hh:%mm') as date_time FROM `hailings`,`trips` INNER JOIN passengers on trips.driver = passengers.id WHERE hailings.id = ?;"
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

    const sql = "SELECT trips.* FROM trips INNER JOIN notification ON trips.service_id = notification.trip_id WHERE notification.user_id = ? ORDER BY trips.id DESC;"
    dbConnection.query(sql, accountId,(err, result)=>{
        if(err){
            console.log(err)
            throw err
        }
        console.log(result)
        res.send(result)
    })
}