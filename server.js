const express = require('express')
var app = express()
const makeRoutes = require('./controller/router.js')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const cors = require('cors')
const crypto = require('crypto')
// Segredo Aleatório do Servidor
app.SECRET = crypto.randomBytes(128).toString('hex')
// leitura do .env file. Teste.
dotenv.config()

app.sequelize = new Sequelize(process.env.DATABASE_URL +
  '?ssl=' + process.env.PGSSLMODE, {
  dialect: 'postgres',
  ssl: true, // Somente para local
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
