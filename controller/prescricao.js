var express = require('express')
var router = express.Router()
var prescricaoModel = require('../models/prescricao.js')
var diagnosticoModel = require('../models/diagnostico.js')

router.get('', (req, res, next) => {
  var Prescricao = prescricaoModel(req.sequelize)
  Prescricao.findAll({
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
    idEnfermeiro: req.body.idEnfermeiro,
    idPaciente: req.pacienteParams.id,
    observacao: req.body.observacao
  }
  var Diagnostico = diagnosticoModel(req.sequelize)
  Prescricao.create(prescricaoDados).then((prescricao) => {
    var diagnosticosDados = []
    for (var i = 0; i < req.body.diagnosticos.length; i++) {
      diagnosticosDados.push({
        idPrescricao: prescricao.dataValues.id,
        nome: req.body.diagnosticos[i],
        resultado: req.body.resultados[i],
        intervencao: req.body.intervencoes[i],
        aprazamento: req.body.aprazamentos[i],
        avaliacao: req.body.avaliacoes[i]
      })
    }
    Diagnostico.bulkCreate(diagnosticosDados).then((diagnosticos) => {
      var dataValues = [prescricao.dataValues]
      for (var i = 0; i < diagnosticos.length; i++) {
        dataValues.push(diagnosticos[i].dataValues)
      }
      res.status(201).json(dataValues)
    }).catch((err) => {
      next(err)
    })
  }).catch((err) => {
    next(err)
  })
})

module.exports = router
