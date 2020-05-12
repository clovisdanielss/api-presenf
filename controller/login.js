const express = require('express')
const router = express.Router()
const jsonwebtoken = require('jsonwebtoken')
const passport = require('passport')
router.post('', (req, res, next) => {
  passport.authenticate('local', (err, enfermeiro, info) => {
    if (err) {
      next(err)
    } else if (enfermeiro) {
      var token = jsonwebtoken.sign({
        id: enfermeiro.id,
        coren: enfermeiro.coren,
        exp: Math.floor(Date.now() / 1000) + 60 * 60
      }, req.SECRET)
      res.json({
        id: enfermeiro.id,
        coren: enfermeiro.coren,
        exp: Math.floor(Date.now() / 1000) + 60 * 50,
        token: token
      })
    } else {
      var error = new Error('Usuário ou senha errada')
      error.status = 401
      next(error)
    }
  })(req, res, next)
})

module.exports = router
