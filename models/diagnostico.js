var Sequelize = require('sequelize')

module.exports = (sequelize) => {
  var Prescricao = require('prescricao')(sequelize)
  return sequelize.define('diagnostico', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    idPrescricao: {
      type: Sequelize.INTEGER,
      references: {
        model: Prescricao,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      },
      allowNull: false
    },
    nome: { type: Sequelize.STRING, allowNull: false },
    resultado: { type: Sequelize.STRING, allowNull: false },
    intervencao: { type: Sequelize.STRING, allowNull: false },
    aprazamento: { type: Sequelize.STRING, allowNull: false },
    avaliacao: { type: Sequelize.STRING, allowNull: false }
  })
}
