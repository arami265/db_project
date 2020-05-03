/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('feedback', {
    feedbackId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'feedback_id'
    },
    ordersId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'order',
        key: 'order_id'
      },
      field: 'orders_id'
    },
    feedbackType: {
      type: DataTypes.STRING(24),
      allowNull: false,
      field: 'feedback_type'
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'rating'
    },
    comments: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      field: 'comments'
    }
  }, {
    tableName: 'feedback'
  });
};
