var express = require('express')
var router = express.Router()
var prescricaoModel = require('../models/prescricao.js')

router.get('', (req, res, next) => {
  var Prescricao = prescricaoModel(req.sequelize)
  Prescricao.findAll({
    limit: 1,
    order: [['dataCriacao', 'DESC']]
  }).then((prescricao) => {
    res.json(prescricao)
  }).catch((err) => {
    next(err)
  })
})

router.all('/:id/*', (req, res, next) => {
  req.prescricaoParams = req.params
  next()
})

router.post('', (req, res, next) => {
  var Prescricao = prescricaoModel(req.sequelize)
  req.body.idPaciente = req.pacienteParams.id
  Prescricao.create(req.body).then((prescricao) => {
    res.status(201).json(prescricao.dataValues)
  }).catch((err) => {
    next(err)
  })
})

module.exports = router
