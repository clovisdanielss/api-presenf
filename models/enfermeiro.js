var Sequelize = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define('enfermeiro', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    coren: { type: Sequelize.INTEGER, unique: true, allowNull: false },
    nome: { type: Sequelize.STRING, allowNull: false }
  }, {
    timestamps: false
  })
}
