const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Group = sequelize.define("groupName", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  group: Sequelize.STRING,
});
module.exports = Group;