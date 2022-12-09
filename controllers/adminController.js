const dbConnection = require("../dbConnection.js").con
exports.getDrivers=async(req, res)=>{

    const sql = "SELECT passengers.firstname, passengers.middlename, passengers.lastname, drivers.* from passengers INNER JOIN drivers on passengers.id = drivers.account_id"

    dbConnection.query(sql,(err,result)=>{
        if(err){
            throw err
        }
        res.send(result)
    })
}
exports.acceptDriver=async(req, res)=>{
    const id = req.body.id
    console.log(id)
    dbConnection.query("UPDATE drivers SET status='accepted' WHERE id=?",id,(err, result)=>{
        if(err){
            res.send({success:false})
            throw err
        }
        res.send({success:true})

    })
}
exports.declineDriver=async(req, res)=>{
    const id = req.body.id
    console.log(id)
    dbConnection.query("UPDATE drivers SET status='declined' WHERE id=?",id,(err, result)=>{
        if(err){
            res.send({success:false})
            throw err
        }
        res.send({success:true})

    })
}