var Sequelize = require('sequelize')
var crypto = require('crypto')

module.exports = (sequelize) => {
  const Enfermeiro = sequelize.define('enfermeiro', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    coren: { type: Sequelize.STRING, unique: true, allowNull: false },
    nome: { type: Sequelize.STRING, allowNull: false },
    senha: {
      type: Sequelize.STRING,
      allowNull: false,
      set (senha) {
        const hash = crypto.createHash('sha512')
        this.setDataValue('tempero', crypto.randomBytes(128).toString('hex'))
        senha = senha + this.tempero
        hash.update(senha)
        senha = hash.digest('hex')
        this.setDataValue('senha', senha)
      }
    },
    tempero: { type: Sequelize.STRING, allowNull: false }
  }, {
    timestamps: false
  })

  return Enfermeiro
}
