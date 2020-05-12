const crypto = require('crypto')
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const enfermeiroModel = require('./models/enfermeiro.js')

module.exports = function (app) {
  app.use(passport.initialize())
  passport.use('local', new Strategy({
    usernameField: 'coren',
    passwordField: 'senha',
    passReqToCallback: true
  }, (req, coren, senha, done) => {
    const Enfermeiro = enfermeiroModel(req.sequelize)
    Enfermeiro.findOne({ where: { coren: req.body.coren } }).then((enfermeiro) => {
      var senha = req.body.senha
      const hash = crypto.createHash('sha512')
      const tempero = enfermeiro.getDataValue('tempero')
      senha = senha + tempero
      hash.update(senha)
      senha = hash.digest('hex')
      console.log(senha, '\n', enfermeiro.getDataValue('senha'))
      if (senha === enfermeiro.getDataValue('senha')) {
        return done(null, enfermeiro)
      } else {
        return done(null, false)
      }
    })
  }))
}
