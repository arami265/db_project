/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('address', {
    addressId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'address_id'
    },
    street: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: 'street'
    },
    city: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: 'city'
    },
    state: {
      type: DataTypes.STRING(48),
      allowNull: false,
      field: 'state'
    },
    zipCode: {
      type: DataTypes.STRING(24),
      allowNull: false,
      field: 'zip_code'
    },
    locationId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'location',
        key: 'location_id'
      },
      field: 'location_id'
    }
  }, {
    tableName: 'address'
  });
};
