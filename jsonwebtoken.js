const jwt = require('express-jwt')
module.exports = (app) => {
  app.use(jwt({
    secret: app.SECRET,
    getToken: (req) => {
      if (req.headers && req.headers.authorization) {
        return req.headers.authorization
      } else {
        return null
      }
    }
  }).unless({ path: ['/login'] }))
}
