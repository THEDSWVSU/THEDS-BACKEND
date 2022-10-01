const dbConnection = require("../dbConnection.js").con

exports.registerPassenger = (req, res)=>{
    console.log("Reached")
    const toInsert = {
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        gender: req.body.gender,
        age:req.body.age,
        birthday:req.body.birthday,
        phone_number: req.body.phone,
        username:req.body.username,
        password:req.body.password

    }

    dbConnection.query("INSERT INTO accounts SET ?", toInsert, (err, result)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            return 0
        }
        console.log(result)
        if(result.affectedRows < 1){
            res.res.send({status:"failed"})
            console.log(result)
            return 0
        }
        res.send({status:"success"})
    })

}
exports.getId = (req, res)=> {
    const username = req.body.username
    const password = req.body.password

    console.log(username)
    console.log(password)
    dbConnection.query("SELECT id from accounts WHERE username = ? AND password = ?", [username, password], (err, result)=>{
        if(err){
            res.sendStatus(500)
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
            accountId:result[0].id
        })
    })
}
exports.login = (req, res)=>{
    
}