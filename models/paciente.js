var Sequelize = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define('paciente', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    prontuario: { type: Sequelize.INTEGER, unique: true, allowNull: false },
    nome: { type: Sequelize.STRING, allowNull: false },
    diasHospital: { type: Sequelize.INTEGER, allowNull: false },
    diasLeito: { type: Sequelize.INTEGER, allowNull: false },
    leito: { type: Sequelize.INTEGER, allowNull: false }
  }, {
    timestamps: false
  })
}
