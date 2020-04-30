var express = require('express')
var router = express.Router()
var pacienteModel = require('../models/paciente.js')

router.get('(/:id)?', (req, res, next) => {
  var dbQuery = {}
  if (req.params.id) {
    dbQuery = {
      id: req.params.id
    }
  }
  var Paciente = pacienteModel(req.sequelize)
  Paciente.findAll({ where: dbQuery }).then((pacientes) => {
    res.json(pacientes)
  }).catch((err) => {
    next(err)
  })
})

router.post('', (req, res, next) => {
  var Paciente = pacienteModel(req.sequelize)
  Paciente.create(req.body).then((paciente) => {
    res.status(201).json(paciente)
  }).catch((err) => {
    next(err)
  })
})

router.delete('/:id', (req, res, next) => {
  var Paciente = pacienteModel(req.sequelize)
  Paciente.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(204).json()
  }).catch((err) => {
    next(err)
  })
})

router.patch('/:id', (req, res, next) => {
  var dbQuery = req.body
  var Paciente = pacienteModel(req.sequelize)
  Paciente.update(dbQuery, {
    where: { id: req.params.id }
  }).then(() => {
    res.status(200).json({ success: 'ok' })
  }).catch((err) => {
    next(err)
  })
})

module.exports = router
