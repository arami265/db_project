/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chatMessage', {
    chatId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'chat_id'
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      },
      field: 'user_id'
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
    message: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'message'
    },
    when: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'when'
    }
  }, {
    tableName: 'chat_message'
  });
};
