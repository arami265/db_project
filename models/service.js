/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('service', {
    serviceId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'service_id'
    },
    companyId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'company_id'
    },
    name: {
      type: DataTypes.STRING(48),
      allowNull: false,
      field: 'name'
    },
    description: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: 'description'
    },
    cost: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'cost'
    },
    serviceType: {
      type: DataTypes.STRING(48),
      allowNull: false,
      field: 'service_type'
    },
    serviceDuration: {
      type: DataTypes.STRING(48),
      allowNull: false,
      field: 'service_duration'
    }
  }, {
    tableName: 'service'
  });
};
