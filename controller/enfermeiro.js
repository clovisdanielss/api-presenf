const express = require('express')
const router = express.Router()
const enfermeiroModel = require('../models/enfermeiro.js')
const passport = require('passport')

router.get('(/:coren)?', (req, res, next) => {
  var dbQuery = {}
  if (req.params.coren) {
    dbQuery = {
      coren: req.params.coren
    }
  }
  var Enfermeiro = enfermeiroModel(req.sequelize)
  Enfermeiro.findAll({ attributes: ['coren', 'nome'], where: dbQuery }).then((enfermeiros) => {
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
    enfermeiro.dataValues.tempero = 'Não preciso mostrar para você'
    enfermeiro.dataValues.senha = 'Não preciso mostrar para você'
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
  passport.authenticate('local', (err, enfermeiro, info) => {
    if (err) {
      next(err)
    } else if (enfermeiro) {
      var Enfermeiro = enfermeiroModel(req.sequelize)
      var dbQuery = req.body
      if (dbQuery.novaSenha) {
        dbQuery.senha = dbQuery.novaSenha
      }
      Enfermeiro.update(dbQuery, {
        where: {
          id: req.params.id
        }
      }).then(() => {
        res.status(200).json({ success: 'updated' })
      }).catch((err) => {
        next(err)
      })
    } else {
      var error = new Error('Usuário ou senha errada')
      error.status = 401
      next(error)
    }
  })(req, res, next)
})

module.exports = router
