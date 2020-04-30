var Sequelize = require('sequelize')

module.exports = (sequelize) => {
  var Enfermeiro = require('./enfermeiro.js')(sequelize)
  var Paciente = require('./paciente.js')(sequelize)
  return sequelize.define('prescricao', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    idEnfermeiro: {
      type: Sequelize.INTEGER,
      references: {
        model: Enfermeiro,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      },
      allowNull: false
    },
    idPaciente: {
      type: Sequelize.INTEGER,
      references: {
        model: Paciente,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      },
      allowNull: false
    },
    dataCriacao: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    observacao: { type: Sequelize.STRING, allowNull: true }
  }, {
    timestamps: false
  })
}
