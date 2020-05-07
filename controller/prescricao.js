var express = require('express')
var router = express.Router()
var prescricaoModel = require('../models/prescricao.js')
var diagnosticoModel = require('../models/diagnostico.js')
var intervencaoModel = require('../models/intervencao.js')

router.get('(/:id)?', (req, res, next) => {
  var Prescricao = prescricaoModel(req.sequelize)
  var query = { idPaciente: req.pacienteParams.id }
  if (req.params.id) {
    query.id = req.params.id
  }
  Prescricao.findAll({
    where: query,
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
  var prescricaoDados = {
    coren: req.body.coren,
    idPaciente: req.pacienteParams.id,
    observacao: req.body.observacao
  }
  Prescricao.create(prescricaoDados).then((prescricao) => {
    res.status(201).json(prescricao.dataValues)
  }).catch((err) => {
    next(err)
  })
})

module.exports = router
