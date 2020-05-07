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
  var Diagnostico = diagnosticoModel(req.sequelize)
  var Intervencao = intervencaoModel(req.sequelize)
  var prescricaoDados = req.body
  prescricaoDados.idPaciente = req.pacienteParams.id
  var diagnosticosDados = prescricaoDados.diagnosticos
  var intervencaosDados = []
  var result = []
  Prescricao.create(prescricaoDados).then((prescricao) => {
    result.push(prescricao.dataValues)
    diagnosticosDados.map((diagnostico) => {
      diagnostico.idPrescricao = prescricao.dataValues.id
    })
    Diagnostico.bulkCreate(diagnosticosDados).then((diagnosticos) => {
      diagnosticos.map((diagnostico, index) => {
        result.push(diagnostico.dataValues)
        diagnosticosDados[index].intervencaos.map((intervencao) => {
          intervencao.idDiagnostico = diagnostico.dataValues.id
          intervencaosDados.push(intervencao)
        })
      })
      Intervencao.bulkCreate(intervencaosDados).then((intervencaos) => {
        intervencaos.map((intervencao) => {
          result.push(intervencao.dataValues)
        })
        res.status(201).json(result)
      })
    })
  }).catch((err) => {
    next(err)
  })
})

module.exports = router
