var Sequelize = require('sequelize')

module.exports = (sequelize) => {
  var Diagnostico = require('./diagnostico.js')(sequelize)
  return sequelize.define('intervencao', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    idDiagnostico: {
      type: Sequelize.INTEGER,
      references: {
        model: Diagnostico,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      },
      allowNull: false
    },
    nome: { type: Sequelize.STRING, allowNull: false },
    profissional: { type: Sequelize.STRING, allowNull: false },
    aprazamento: { type: Sequelize.STRING, allowNull: false }
  }, {
    timestamps: false
  })
}
