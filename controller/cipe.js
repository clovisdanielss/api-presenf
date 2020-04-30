var express = require('express')
var router = express.Router()
var cipeDic = require('../cipe.json')

router.get('', (req, res, next) => {
  if (req.query.eixo) {
    var query = req.query.eixo + ' '
    res.json(cipeDic[query])
  } else {
    var err = new Error()
    err.name = 'MissingStringQuery'
    err.status = 400
    next(err)
  }
})

module.exports = router
