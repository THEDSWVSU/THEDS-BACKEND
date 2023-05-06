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

    const sql = "SELECT drivers.account_id, drivers.status FROM drivers INNER JOIN passengers ON drivers.account_id = passengers.id WHERE passengers.username = ? AND passengers.password = ?";
    dbConnection.query(sql, [username, password], (err, result)=>{
        if(err){
            res.send(err)
            throw err
        }
        if(!result[0])res.send({
            status:"failed",
            msg:"Username or password is incorrect"
        })
        else if(result[0].status === "pending")res.send({
            success:"failed",
            msg:"Your acount is not verified yet. Please wait for at least 24 hours."
        })
        else if(result[0].status === "deactivated")res.send({
            success:"failed",
            msg:"Your acount is deactivated. Please contact the admin to resolve this issue."
        })
        else res.send({
            status:"success",
            accountId:result[0].account_id
        })
    })
}

exports.getFeeds = (req, res) => {
    const sql = "SELECT delivery.transaction_id,passengers.id as passenger_id, passengers.firstname, passengers.middlename, passengers.lastname,passengers.phone_number, delivery.id, delivery.small_luggage, delivery.medium_luggage, delivery.large_luggage, delivery.pickup_time, delivery.origin, delivery.destination,delivery.status, date_format(delivery.date_time,'%M %d %Y, %hh:%mm') as date_time, delivery.price, delivery.distance FROM `delivery` INNER JOIN passengers on delivery.passenger = passengers.id WHERE delivery.status = 'pending';"

    dbConnection.query(sql, (err, result)=>{
        if(err){
            console.log(err)
            return res.send({success:false})
        }
        return res.send({success:true, data:result})
    })
}
exports.getHailings = (req, res) => {

    const sql = "SELECT hailings.transaction_id, passengers.id as passenger_id, passengers.firstname, passengers.middlename, passengers.lastname, passengers.phone_number, hailings.id, hailings.pickup_time, hailings.origin, hailings.destination,hailings.status, date_format(hailings.date_time,'%M %d %Y, %hh:%mm'), hailings.price as date_time FROM `hailings` INNER JOIN passengers on hailings.passenger = passengers.id WHERE hailings.status = 'pending';"

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

    const sql = "SELECT delivery.transaction_id, passengers.id as passenger_id, passengers.firstname, passengers.middlename, passengers.lastname,passengers.phone_number,  delivery.id, delivery.coords, delivery.small_luggage, delivery.medium_luggage, delivery.large_luggage, delivery.pickup_time, delivery.origin, delivery.destination,delivery.status, date_format(delivery.date_time,'%M %d %Y, %hh:%mm') as date_time, delivery.price, delivery.distance FROM `delivery` INNER JOIN passengers on delivery.passenger = passengers.id WHERE delivery.id = ?;"
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

    const sql = "SELECT hailings.transaction_id, passengers.id as passenger_id, passengers.firstname, passengers.middlename, passengers.lastname, passengers.phone_number, hailings.coords, hailings.id, hailings.pickup_time, hailings.origin, hailings.destination,hailings.status, hailings.price, date_format(hailings.date_time,'%M %d %Y, %hh:%mm') as date_time FROM `hailings` INNER JOIN passengers on hailings.passenger = passengers.id WHERE hailings.id = ?;"
    
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


    const sql = type==="delivery"?"UPDATE delivery set status = 'accepted' WHERE id = ? AND status = 'pending'":"UPDATE hailings set status = 'accepted' WHERE id = ? AND status = 'pending'"

    dbConnection.query(sql, tripId, (err, result)=>{
        if(err){
            console.log(err)
            return res.send({success:false})
        }
        console.log(result)
        if(!result.affectedRows) return res.send({success:false,msg:"Booking is not available"})
        
        const addTrip = "INSERT INTO trips(service_id, type, driver) VALUES(?,?,?)"

        dbConnection.query(addTrip,[tripId, type, driverId],(err, result)=>{
            if(err){
                console.log(err)
                return res.send({success:false})
            }
            const addNotification = "INSERT INTO notification(trip_id, type, user_id,status) VALUES(?,?,?,?)"

            dbConnection.query(addNotification,[tripId, type,  passengerId,"accepted"],(err, result1)=>{
                if(err){
                    res.send({success:false})
                    throw err
                }
                return res.send({success:true})

            })
        })
    })
    
    
}
exports.driverTripsPerDay = (req, res) => {
    const sql = `SELECT date_format(trips.date_time,'%Y-%m-%d') as date, CONCAT(passengers.firstname,' ', passengers.middlename,' ', passengers.lastname)AS driver, COUNT(trips.id) as trips, trips.service_id, trips.type, SUM(IF(trips.type = 'service', hailings.price, delivery.price)) AS price from trips INNER JOIN passengers ON trips.driver = passengers.id AND trips.status = 'done' LEFT JOIN hailings ON trips.service_id = hailings.id AND trips.type ='service' LEFT JOIN delivery ON trips.service_id = delivery.id AND trips.type = 'delivery' WHERE trips.status = 'done' GROUP BY date_format(trips.date_time,'%Y-%m-%d')`

    dbConnection.query(sql,(err, result)=>{
        if(err){
            console.log(err)
            return res.sendStatus(500)
        }
        return res.send(result)
    })
}
exports.updateTrip = async(req, res) => {
    const type = req.body.type
    const tripId = req.body.tripId
    const update = req.body.update
    const passenger = req.body.passengerId

    console.log("status",update)
    let sql = ""
    type === "service"? sql = "UPDATE hailings SET status = ? WHERE id = ?": sql = "UPDATE delivery SET status = ? WHERE id = ?"

    dbConnection.query(sql,[update, tripId],(err, result)=>{
        if(err){
            res.send({success:false})
            throw err
        }
        let notifSql = "INSERT INTO notification (trip_id, type, user_id,status) VALUES(?,?,?,?)"
        dbConnection.query(notifSql,[tripId, type, passenger, update],(err1, result1)=>{
            if(err1){
                res.send({success:false})
                throw err1
            }
            console.log("updating",tripId)

                const tripUpdateSql = "UPDATE trips SET status = ? WHERE service_id=?"
                dbConnection.query(tripUpdateSql,[update,tripId],(err, result)=>{
                    if(err){
                        console.log(err)
                    }
                    console.log("updating trip",update)
                })
    
            res.send({success:true})
        })

    })

}