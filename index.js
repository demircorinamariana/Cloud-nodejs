const express = require("express")
const Sequelize = require('sequelize')

//config bd

const sequelize = new Sequelize('profile', 'username', 'password', {
    dialect: "mysql",
    host: "localhost"
})

//autentif bd

sequelize.authenticate().then(() => {
    console.log("Connected to database")
}).catch(() => {
    console.log("Unable to connect to database")
})

const app = express()


//cand ajung la radacina site ului imi apare ce e in fis frontend
app.use('/', express.static('frontend'))




app.use(express.json())
app.use(express.urlencoded())



app.listen(process.env.PORT||8080)
