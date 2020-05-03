/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    orderId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'order_id'
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'user_id'
    },
    serviceId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'service_id'
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'total'
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'order_date'
    },
    employeeId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'employee_id'
    },
    reservationNotes: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'reservation_notes'
    },
    reservationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'reservation_date'
    },
    reservationStatus: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: 'reservation_status'
    },
    reservationStart: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'reservation_start'
    },
    reservationEnd: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'reservation_end'
    },
    dateFinished: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'date_finished'
    }
  }, {
    tableName: 'order'
  });
};
