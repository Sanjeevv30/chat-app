const message = require("../models/message");
const signup = require("../models/signup");
const userGroupDb = require("../models/user-group");
const sequelize = require("../util/database");

exports.message = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const messageBody = req.body.msg;
    const groupId = req.body.groupId;
    const data = await message.create(
      {
        // id:id,
        message: messageBody,
        userId: req.user.id,
        groupId: groupId,
        userName: req.user.name,
      },
      { transaction: t }
    );
    await t.commit();
    res.json({ message: data, success: true });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: "Message Not Send", err });
  }
};

let groupIds;

exports.all_message = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    groupIds = req.headers.authorization;
    const data = await message.findAll(
      { where: { groupId: groupIds } },
      { transaction: t }
    );
    await t.commit();
    res.json({ allData: data });
  } catch (error) {
    console.log(error);
    await t.rollback();
    res.json({ error: error, success: false });
  }
};

exports.getAllUser = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const data = await signup.findAll();
    await t.commit();
    res.json({ allUser: data });
  } catch (err) {
    await t.rollback();
    console.log("error in add to group", err);
  }
};

exports.addToGroup = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.body.userId;
    const groupId = req.body.groupId;
    //console.log(userId, groupId);
    const data = await userGroupDb.create(
      {
        userId: userId,
        groupNameId: groupId,
      },
      { transaction: t }
    );
    await t.commit();
    res.json({ groupAdd: data });
  } catch (err) {
    await t.rollback();
    console.log("error in add to group", err);
  }
};

exports.getUser = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id;
    const data = await userGroupDb.findAll(
      {
        where: { groupNameId: groupIds },
      },
      { transaction: t }
    );
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      const id = data[i].dataValues.userId;
      const data2 = await signup.findOne({ where: { id: id } });
      arr.push(data2.dataValues);
    }
    await t.commit();
    res.json({ allUser: arr, isAdmin: data });
  } catch (error) {
    await t.rollback();
    console.error("Error in getUser:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.removeMember = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.body.userId;
    const groupId = req.body.groupId;
    const data = await userGroupDb.findOne(
      {
        where: { userId: userId, groupNameId: groupId },
      },
      { transaction: t }
    );
    await t.commit();
    data.destroy();
  } catch (e) {
    await t.rollback();
    console.log("error in remove method", e);
  }
};
exports.addAdmin = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.body.userId;
    const groupId = req.body.groupId;
    const data = await userGroupDb.update(
      { isAdmin: true },
      { where: { userId: userId, groupId: groupId } },
      { transaction: t }
    );
    await t.commit();
    res.status(201).json({ message: success });
  } catch (error) {
    await t.rollback();
    console.log("error in remove method", error);
  }
};
