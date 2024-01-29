const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const UserGroupDb = sequelize.define("userGroupDb", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  group: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
  isAdmin: Sequelize.BOOLEAN,
});
module.exports = UserGroupDb;
