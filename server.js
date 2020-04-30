var express = require('express')
var app = express()
var makeRoutes = require('./controller/router.js')
var dotenv = require('dotenv')
var bodyParser = require('body-parser')
var Sequelize = require('sequelize')
var cors = require('cors')
// leitura do .env file.
dotenv.config()

app.sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  // ssl: true, // Somente para local
  native: true, // Somente para local
  timezone: '-06:00'
})

app.use(cors())
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
