var paciente = require('./paciente.js')
var prescricao = require('./prescricao')
var historico = require('./historico')
var enfermeiro = require('./enfermeiro')

module.exports = (app) => {
  // composition pattern.
  app.use((req, res, next) => {
    req.sequelize = app.sequelize
    next()
  })
  app.use('/paciente', paciente)
  app.use('/paciente/:idPaciente/prescricao', prescricao)
  app.use('/paciente/:idPaciente/historico', historico)
  app.use('/enfermeiro', enfermeiro)
  // middlewares para erros.
  app.use((err, req, res, next) => {
    console.error(err)
    next(err)
  })
  app.use((err, req, res, next) => {
    if (err.status == null) {
      err.status = 500
    }
    res.status(err.status).send(err)
  })
}
