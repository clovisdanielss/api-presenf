var express = require('express')
var router = express.Router()
var enfermeiroModel = require('../models/enfermeiro.js')

router.get('(/:coren)?', (req, res, next) => {
  var dbQuery = {}
  if (req.params.coren) {
    dbQuery = {
      coren: req.params.coren
    }
  }
  var Enfermeiro = enfermeiroModel(req.sequelize)
  Enfermeiro.findAll({ where: dbQuery }).then((enfermeiros) => {
    res.send(enfermeiros)
  }).catch((err) => {
    next(err)
  })
})

router.all('/:id/*', (req, res, next) => {
  req.enfermeiroParams = req.params
  next()
})

router.post('', (req, res, next) => {
  var Enfermeiro = enfermeiroModel(req.sequelize)
  Enfermeiro.create(req.body).then((enfermeiro) => {
    res.status(201).send(enfermeiro.dataValues)
  }).catch((err) => {
    next(err)
  })
})

router.delete('/:id', (req, res, next) => {
  console.log('removendo:', req.params)
  var Enfermeiro = enfermeiroModel(req.sequelize)
  Enfermeiro.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    console.log('Removido', req.params.id)
    res.status(204).send()
  }).catch((err) => {
    next(err)
  })
})

router.patch('/:id', (req, res, next) => {
  var Enfermeiro = enfermeiroModel(req.sequelize)
  var dbQuery = req.body
  Enfermeiro.update(dbQuery, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200).json({ success: 'ok' })
  }).catch((err) => {
    next(err)
  })
})

module.exports = router
