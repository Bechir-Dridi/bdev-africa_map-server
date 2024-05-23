// developed by "Bechir Dridi"
// Portfolio: https://bechirdev.vercel.app 
// twitter:   https://twitter.com/bechir7dridi 
// linkedin:  https://linkedin.com/in/bechir-dev/
// github:    https://github.com/Bechir-Dridi
const cors = require("cors")
const express = require("express")
const app = express()
//const mysql = require('mysql2');


//----------- middleware -------------
require("dotenv").config()
// Middleware to enable CORS
app.use(cors(
    //{ origin: "*", credentials: true, }, //server accepts requests from static site
    { origin: ["http://localhost:3000", "https://bdev-saitama.netlify.app"], credentials: true, } //server accepts requests from static site
))
app.use(express.json())//body parsing middleware for body
app.use(express.urlencoded({ extended: true }));//body parsing middleware for formUrlEncoded

//----------- Routes -------------
app.get("/test", (req, res) => {
    res.json({ mssg: "welcome to the app" })
})

const countriesRoutes = require("./routes/countries.js")
const imagesRoutes = require("./routes/images.js")
app.use("/api/countries", countriesRoutes)
app.use("/api/images", imagesRoutes)


//connect to db:
// const conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'bechir',
//     password: '',
//     database: 'countries_db'
// });

//conn.connect((dbError) => {
//   if (!dbError) {
//listen for requests
app.listen(process.env.PORT, () => {
    console.log('Listening on PORT', process.env.PORT)
})

// }
// else {
//console.log("cannot connect to DB!");
// };
//})

// Export connected client
//module.exports = { conn };
