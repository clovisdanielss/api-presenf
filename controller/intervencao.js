var express = require('express')
var router = express.Router()
var intervencaoModel = require('../models/intervencao.js')

router.get('(/:id)?', (req, res, next) => {
  var query = { idDiagnostico: req.diagnosticoParams.id }
  if (req.params.id) {
    query.id = req.params.id
  }
  var Intervencao = intervencaoModel(req.sequelize)
  Intervencao.findAll({
    where: query
  }).then((intervencoes) => {
    res.json(intervencoes)
  }).catch((err) => {
    next(err)
  })
})

router.all('/:id/*', (req, res, next) => {
  req.intervencaoParams = req.params
  next()
})

router.post('', (req, res, next) => {
  var Intervencao = intervencaoModel(req.sequelize)
  var intervencaoDados = {
    idDiagnostico: req.diagnosticoParams.id,
    nome: req.body.nome,
    profissional: req.body.profissional,
    aprazamento: req.body.aprazamento
  }
  Intervencao.create(intervencaoDados).then((intervencao) => {
    res.status(201).json(intervencao.dataValues)
  }).catch((err) => {
    next(err)
  })
})

module.exports = router
