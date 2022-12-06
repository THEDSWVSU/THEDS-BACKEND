const dbConnection = require('./../dbConnection').con

exports.register = (req, res)=> {
    const toInsert = {
        account_id: req.body.accountId,
        motorcycle_brand: req.body.motorBrand,
        model: req.body.model,
        plate_number: req.body.plate,
        engineCC:req.body.cc,
        color:req.body.color,
    }
    dbConnection.query("INSERT INTO drivers SET ?", toInsert, (err, result)=>{

        if(err){
            if(err.code === "ER_DUP_ENTRY"){
                res.send({status:"duplicate"})
                return 0
            }
            else throw err
        }
        console.log(result)

        if(result.affectedRows < 1){
            res.sendStatus(500)
            throw "insert passenger error"
        }
        res.send({status:"success"})
    })
}
exports.login = (req,res) => {
    const username = req.body.username
    const password = req.body.password

    const sql = "SELECT drivers.account_id FROM drivers INNER JOIN passengers ON drivers.account_id = passengers.id WHERE passengers.username = ? AND passengers.password = ?";
    dbConnection.query(sql, [username, password], (err, result)=>{
        if(err){
            res.send(err)
            throw err
        }
        console.log(result)
        if(!result[0])res.send({
            status:"failed",
            msg:"Username or password is incorrect"
        })
        else res.send({
            status:"success",
            accountId:result[0].account_id
        })
    })
}

exports.getFeeds = (req, res) => {
    const sql = "SELECT passengers.id as passenger_id, passengers.firstname, passengers.middlename, passengers.lastname, delivery.id, delivery.small_luggage, delivery.medium_luggage, delivery.large_luggage, delivery.pickup_time, delivery.origin, delivery.destination,delivery.status, date_format(delivery.date_time,'%M %d %Y, %hh:%mm') as date_time, delivery.price, delivery.distance FROM `delivery` INNER JOIN passengers on delivery.passenger = passengers.id WHERE delivery.status = 'pending';"

    dbConnection.query(sql, (err, result)=>{
        if(err){
            console.log(err)
            return res.send({success:false})
        }
        console.log(result)
        return res.send({success:true, data:result})
    })
}
exports.getHailings = (req, res) => {

    const sql = "SELECT passengers.id as passenger_id, passengers.firstname, passengers.middlename, passengers.lastname, hailings.id, hailings.pickup_time, hailings.origin, hailings.destination,hailings.status, date_format(hailings.date_time,'%M %d %Y, %hh:%mm') as date_time FROM `hailings` INNER JOIN passengers on hailings.passenger = passengers.id WHERE hailings.status = 'pending';"

    dbConnection.query(sql, (err, result)=>{
        if(err){
            console.log(err)
            return res.send({success:false})
        }
        return res.send({success:true, data:result})
    })
}
exports.getQue = (req, res) => {
    const driver = req.body.driver
    const sql = "SELECT * from trips WHERE driver = ? ORDER BY id ASC"

    dbConnection.query(sql,driver, (err, result)=>{
        if(err){
            console.log(err)
            return res.send({success:false})
        }

        return res.send({success:true, data:result})
    })
}
exports.getDeliveryDetails = (req, res) => {
    const tripId = req.body.tripId
    console.log("Getting delivery details")

    const sql = "SELECT passengers.id as passenger_id, passengers.firstname, passengers.middlename, passengers.lastname, delivery.id, delivery.small_luggage, delivery.medium_luggage, delivery.large_luggage, delivery.pickup_time, delivery.origin, delivery.destination,delivery.status, date_format(delivery.date_time,'%M %d %Y, %hh:%mm') as date_time, delivery.price, delivery.distance FROM `delivery` INNER JOIN passengers on delivery.passenger = passengers.id WHERE delivery.id = ?;"
    dbConnection.query(sql, tripId,(err, result)=>{
        if(err){
            res.send({success:false})
            throw err
        }
        return res.send(result[0])
    })
}
exports.getHailingDetails = (req, res) => {
    const tripId = req.body.tripId

    const sql = "SELECT passengers.firstname, passengers.middlename, passengers.lastname, hailings.id, hailings.pickup_time, hailings.origin, hailings.destination,hailings.status, date_format(hailings.date_time,'%M %d %Y, %hh:%mm') as date_time FROM `hailings` INNER JOIN passengers on hailings.passenger = passengers.id WHERE hailings.id = ?;"
    dbConnection.query(sql, tripId,(err, result)=>{
        if(err){
            res.send({success:false})
            throw err
        }
        return res.send(result[0])
    })
}
exports.acceptTrip = (req, res) => { 
    const tripId = req.body.tripId
    const type = req.body.type
    const passengerId = req.body.passengerId
    const driverId = req.body.driverId


    const sql = type==="delivery"?"UPDATE delivery set status = 'accepted' WHERE id = ?":"UPDATE hailings set status = 'accepted' WHERE id = ?"

    dbConnection.query(sql, tripId, (err, result)=>{
        if(err){
            console.log(err)
            return res.send({success:false})
        }
        console.log(result)
        const addTrip = "INSERT INTO trips(service_id, type, driver) VALUES(?,?,?)"

        dbConnection.query(addTrip,[tripId, type, driverId],(err, result)=>{
            if(err){
                console.log(err)
                return res.send({success:false})
            }
            const addNotification = "INSERT INTO notification(trip_id, type, user_id) VALUES(?,?,?)"

            dbConnection.query(addNotification,[tripId, type,  passengerId],(err, result1)=>{
                if(err){
                    res.send({success:false})
                    throw err
                }
                return res.send({success:true})

            })
        })
    })
    
    
}