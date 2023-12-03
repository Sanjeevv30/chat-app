const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Message = sequelize.define("Message", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  message: Sequelize.STRING,
  groupId: Sequelize.INTEGER,
  userName: Sequelize.STRING,
});

module.exports = Message;
