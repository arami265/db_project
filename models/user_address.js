/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userAddress', {
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'user_id'
    },
    addressId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'address_id'
    }
  }, {
    tableName: 'user_address'
  });
};
