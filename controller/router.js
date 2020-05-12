const paciente = require('./paciente.js')
const prescricao = require('./prescricao.js')
const enfermeiro = require('./enfermeiro.js')
const diagnostico = require('./diagnostico.js')
const intervencao = require('./intervencao.js')
const cipe = require('./cipe.js')
const passport = require('../passport')
const login = require('./login')
const jsonwebtoken = require('../jsonwebtoken')
module.exports = (app) => {
  // composition pattern.
  app.use((req, res, next) => {
    req.sequelize = app.sequelize
    req.SECRET = app.SECRET
    next()
  })
  jsonwebtoken(app)
  passport(app)
  app.use('/paciente', paciente)
  app.use('/paciente/:idPaciente/prescricao', prescricao)
  app.use('/paciente/:idPaciente/prescricao/:id/diagnostico', diagnostico)
  app.use('/paciente/:idPaciente/prescricao/:id/diagnostico/:id/intervencao', intervencao)
  app.use('/enfermeiro', enfermeiro)
  app.use('/cipe', cipe)
  app.use('/login', login)
  // middlewares para erros.
  app.use((err, req, res, next) => {
    console.error('Houve um erro: ', err.message)
    next(err)
  })
  app.use((err, req, res, next) => {
    console.log('O servidor respondeu o cliente com um erro.')
    if (err.status == null) {
      err.status = 500
    }
    res.status(err.status).json({ error: err, message: err.message })
  })
}
