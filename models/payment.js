/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment', {
    paymentId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'payment_id'
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
    orderId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'order',
        key: 'order_id'
      },
      field: 'order_id'
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'amount'
    },
    reciept: {
      type: DataTypes.STRING(400),
      allowNull: false,
      field: 'reciept'
    },
    paymentMethod: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'payment_method'
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'payment_date'
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created'
    }
  }, {
    tableName: 'payment'
  });
};
