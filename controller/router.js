var paciente = require('./paciente.js')
var prescricao = require('./prescricao')
var enfermeiro = require('./enfermeiro')

module.exports = (app) => {
  // composition pattern.
  app.use((req, res, next) => {
    req.sequelize = app.sequelize
    next()
  })
  app.use('/paciente', paciente)
  app.use('/paciente/:idPaciente/prescricao', prescricao)
  app.use('/enfermeiro', enfermeiro)
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
