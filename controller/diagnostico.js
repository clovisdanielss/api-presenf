var express = require('express')
var router = express.Router()
var diagnosticoModel = require('../models/diagnostico.js')
var intervencaoModel = require('../models/intervencao.js')

router.get('(/:id)?', (req, res, next) => {
  var query = { idPrescricao: req.prescricaoParams.id }
  if (req.params.id) {
    query.id = req.params.id
  }
  var Intervencao = intervencaoModel(req.sequelize)
  var Diagnostico = diagnosticoModel(req.sequelize)
  Diagnostico.hasMany(Intervencao, { foreignKey: 'idDiagnostico' })
  Intervencao.belongsTo(Diagnostico, { foreignKey: 'idDiagnostico' })
  Diagnostico.findAll({
    where: query,
    include: [{ model: Intervencao }]
  }).then((diagnosticos) => {
    res.json(diagnosticos)
  }).catch((err) => {
    next(err)
  })
})

router.all('/:id/*', (req, res, next) => {
  req.diagnosticoParams = req.params
  next()
})

router.post('', (req, res, next) => {
  var Diagnostico = diagnosticoModel(req.sequelize)
  var diagnosticoDados = {
    idPrescricao: req.prescricaoParams.id,
    nome: req.body.nome,
    resultado: req.body.resultado,
    avaliacao: req.body.avaliacao
  }
  Diagnostico.create(diagnosticoDados).then((diagnostico) => {
    res.status(201).json(diagnostico.dataValues)
  }).catch((err) => {
    next(err)
  })
})

module.exports = router
