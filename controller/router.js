var paciente = require('./paciente.js')
var prescricao = require('./prescricao.js')
var enfermeiro = require('./enfermeiro.js')
var diagnostico = require('./diagnostico.js')
var intervencao = require('./intervencao.js')
var cipe = require('./cipe.js')

module.exports = (app) => {
  // composition pattern.
  app.use((req, res, next) => {
    req.sequelize = app.sequelize
    next()
  })
  app.use('/paciente', paciente)
  app.use('/paciente/:idPaciente/prescricao', prescricao)
  app.use('/paciente/:idPaciente/prescricao/:id/diagnostico', diagnostico)
  app.use('/paciente/:idPaciente/prescricao/:id/diagnostico/:id/intervencao', intervencao)
  app.use('/enfermeiro', enfermeiro)
  app.use('/cipe', cipe)
  // middlewares para erros.
  app.use((err, req, res, next) => {
    console.error('Houve um erro: ', err)
    next(err)
  })
  app.use((err, req, res, next) => {
    console.log('O servidor respondeu o cliente com um erro.')
    if (err.status == null) {
      err.status = 500
    }
    res.status(err.status).send(err)
  })
}
