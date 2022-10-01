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

    const sql = "SELECT drivers.account_id FROM drivers INNER JOIN accounts ON drivers.account_id = accounts.id WHERE accounts.username = ? AND accounts.password = ?";
    dbConnection.query(sql, [username, password], (err, result)=>{
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
            accountId:result[0].account_id
        })
    })
}