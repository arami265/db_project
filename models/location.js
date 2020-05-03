/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('location', {
    locationId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'location_id'
    },
    ipAddress: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: 'ip_address'
    },
    latitude: {
      type: "DOUBLE",
      allowNull: true,
      field: 'latitude'
    },
    longitude: {
      type: "DOUBLE",
      allowNull: true,
      field: 'longitude'
    }
  }, {
    tableName: 'location'
  });
};
