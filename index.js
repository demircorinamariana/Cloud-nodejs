const express = require("express")
const Sequelize = require('sequelize')
const axios = require("axios")
let sequelize

const app = express()

app.use('/', express.static('frontend'))
//definesc un endpoint de tip GET /hello
app.get('/hello', (request, response) => {
   response.status(200).json({hello: process.env})
})
app.use(express.json())
app.use(express.urlencoded())

app.post('/googleapis/:code', async (req, res) => {
    const code = req.params.code
    try {
        let auth = await axios({
            url: 'https://www.googleapis.com/auth/books',
            method: 'POST',
            data: {
                client_id: '76722012479-r46rmemr9ph6prfpl8dk8e9mq79psjri.apps.googleusercontent.com',
                client_secret: '-6sKa9rMT06BzU10d7f2ZKiM',
                code: code,
            },
            headers: {
                'Accept': 'application/json' 
            }
        })
        res.status(200).json(auth['data'])
    } catch(err) {
        res.status(500).json(err)
    }
})
app.listen(8080)