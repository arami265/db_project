/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('company', {
    companyId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'company_id'
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: 'name'
    },
    description: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'description'
    },
    addressId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'address',
        key: 'address_id'
      },
      field: 'address_id'
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      field: 'email'
    },
    phoneNumber: {
      type: DataTypes.STRING(12),
      allowNull: false,
      field: 'phone_number'
    },
    visitFee: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'visit_fee'
    }
  }, {
    tableName: 'company'
  });
};
