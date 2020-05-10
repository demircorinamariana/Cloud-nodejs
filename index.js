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

const Messages = sequelize.define('messages', {
    subject: Sequelize.STRING,
    name: Sequelize.STRING,
    message: Sequelize.TEXT
})

const app = express()


//cand ajung la radacina site ului imi apare ce e in fis frontend
app.use('/', express.static('frontend'))

//definesc un endoint de tip get la o adresa helo

app.get('/hello', (request, response) => {
    response.status(200).json({hello: process.env})
})

app.get('/test',(req,res) => {
    
})

//endpoint 

app.get('/createdb', (request, response) => {
    sequelize.sync({force:true}).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        console.log(err)
        response.status(200).send('could not create tables')
    })
})

app.use(express.json())
app.use(express.urlencoded())

//definire endpoint POST /messages - aduce date in bd
app.post('/messages', (request, response) => {
    Messages.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})


//ia date din bd 

app.get('/messages', (request, response) => {
    Messages.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/messages/:id', (request, response) => {
    Messages.findByPk(request.params.id).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

// citesc resursa, daca imi ret un status succes, o actualizez cu datele din body apoi intoarce 201

app.put('/messages/:id', (request, response) => {
    Messages.findByPk(request.params.id).then((message) => {
        if(message) {
            message.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

//sterge resursa cu id u specificat 

app.delete('/messages/:id', (request, response) => {
    Messages.findByPk(request.params.id).then((message) => {
        if(message) {
            message.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.listen(process.env.PORT||8080)
