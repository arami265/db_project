/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sessions', {
    sessionId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: '',
      primaryKey: true,
      field: 'session_id'
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'expires'
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'data'
    }
  }, {
    tableName: 'Sessions'
  });
};
