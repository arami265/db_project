/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'user_id'
    },
    userType: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: 'user_type'
    },
    firstName: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: 'last_name'
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      field: 'email'
    },
    phoneNumber: {
      type: DataTypes.STRING(24),
      allowNull: false,
      field: 'phone_number'
    },
    birthdate: {
      type: DataTypes.STRING(24),
      allowNull: false,
      field: 'birthdate'
    },
    companyId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'company',
        key: 'company_id'
      },
      field: 'company_id'
    },
    licenseNumber: {
      type: DataTypes.STRING(24),
      allowNull: true,
      field: 'license_number'
    },
    locationId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'location',
        key: 'location_id'
      },
      field: 'location_id'
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'date_created'
    },
    dateModified: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'date_modified'
    },
    salt: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'salt'
    },
    hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'hash'
    }
  }, {
    tableName: 'user'
  });
};
