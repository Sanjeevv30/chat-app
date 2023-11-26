const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Signup = sequelize.define("Signup", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  phoneNumber: {
    type: Sequelize.STRING(20),
    allowNull: false,
},
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Signup;
