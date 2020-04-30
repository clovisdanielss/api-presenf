var express = require('express')
var app = express()
var makeRoutes = require('./controller/router.js')
var dotenv = require('dotenv')
var bodyParser = require('body-parser')
var Sequelize = require('sequelize')
// leitura do .env file.
dotenv.config()

// Pegand parâmetros para conexão de banco de dados.
const database = process.env.DATABASE
const dbusername = process.env.DBUSERNAME
const dbpassword = process.env.DBPASSWORD
const dbhost = process.env.DBHOST

app.sequelize = new Sequelize(database, dbusername, dbpassword, {
  host: dbhost,
  dialect: 'postgres',
  ssl: true, // Somente para local
  native: true // Somente para local
})

// Body parser para adquirir objeto body.
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
makeRoutes(app)

// Servidor só sobe se a conexão com o banco de dados der certo.
app.sequelize.authenticate().then(() => {
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
