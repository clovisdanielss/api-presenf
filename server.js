var express = require('express')
var app = express()
var dotenv = require('dotenv')
var bodyParser = require('body-parser')
var Sequelize = require('sequelize')

dotenv.config()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const database = process.env.DATABASE
const dbusername = process.env.DBUSERNAME
const dbpassword = process.env.DBPASSWORD
const dbhost = process.env.DBHOST
const dburi = process.env.DBURI

const sequelize = new Sequelize(database, dbusername, dbpassword, {
  host: dbhost,
  dialect: 'postgres',
  ssl: true,
  native: true
})

sequelize.authenticate().then(() => {
  console.log('Conectado ao banco de dados')
  app.listen(process.env.PORT, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log('Escutando na porta', process.env.PORT)
    }
  })
}).catch((err) => {
  console.error('Erro na conexão ao banco de dados:\n', err)
})
