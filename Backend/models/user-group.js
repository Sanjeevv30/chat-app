const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const UserGroupDb = sequelize.define("UserGroupDb", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  groupNameId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
  isAdmin: Sequelize.BOOLEAN,
});
module.exports = UserGroupDb;
