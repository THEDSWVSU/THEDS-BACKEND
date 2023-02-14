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
exports.deactivateDriver=async(req, res)=>{
    const id = req.body.id
    console.log(id)
    dbConnection.query("UPDATE drivers SET status='deactivated' WHERE id=?",id,(err, result)=>{
        if(err){
            res.send({success:false})
            throw err
        }
        res.send({success:true})

    })
}
exports.activateDriver=async(req, res)=>{
    const id = req.body.id
    console.log(id)
    dbConnection.query("UPDATE drivers SET status='activated' WHERE id=?",id,(err, result)=>{
        if(err){
            res.send({success:false})
            throw err
        }
        res.send({success:true})

    })
}
exports.login = async(req, res)=>{
    const username = req.body.username
    const password = req.body.password

    console.log(req.body)

    dbConnection.query("SELECT * FROM admin where username=?",[username,password],
    (err, result)=>{
        if(err){
            console.log(err)
            return res.sendStatus(500)
        }
        console.log(result)
        if(!result[0])return res.send({success:false, msg:"Wrong username"})
        if(result[0]?.password !== password)return res.send({success:false, msg:"Wrong password"})
        res.send({success:true})
    })
}
exports.changePassword = async(req, res)=>{
    const oldpassword = req.body.currpassword
    const newpassword = req.body.newpassword

    console.log(req.body)

    dbConnection.query("UPDATE admin SET password = ? where password=?",[newpassword,oldpassword],
    (err, result)=>{
        if(err){
            console.log(err)
            return res.sendStatus(500)
        }
        console.log(result)
        if(result.affectedRows === 0)return res.send({success:false, msg:"Old password is incorrect."})
        res.send({success:true})
    })
}