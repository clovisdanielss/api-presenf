var express = require('express')
var router = express.Router()
var enfermeiroModel = require('../models/enfermeiro.js')

router.get('', (req, res, next) => {
  res.json({ route: 'enfermeiro' })
})

router.post('', (req, res, next) => {
  var Enfermeiro = enfermeiroModel(req.sequelize)
  Enfermeiro.create(req.body).then((enfermeiro) => {
    res.send(enfermeiro.dataValues)
  })
})

module.exports = router
