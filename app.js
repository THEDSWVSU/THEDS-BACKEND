const express = require('express')
const app = express()
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var cors = require('cors')
const path = require('path')
const conn = require('./DbConnection').con


const driverRoute = require("./routes/driverRoutes")
const passengerRoute = require("./routes/passengerRoutes")
const accountRoute = require("./routes/accountRoute")

const PORT = 4000



app.use(cors({origin:'*'}))

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use('/driver', driverRoute)
app.use('/account', accountRoute)
app.use('/passenger', passengerRoute)

app.listen(PORT, ()=>{
    console.log("Server is listening at port: "+PORT)
})


conn.connect(function (err) {
    if (err) {
      throw err;
    }
    console.log("Database connected")
    
  });
module.exports = app