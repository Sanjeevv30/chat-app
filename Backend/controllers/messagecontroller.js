const message = require("../models/message");
const signup = require("../models/signup");
const userGroupDb = require("../models/user-group");

exports.message = async (req, res) => {
  try {
    const { messageBody } = req.body;
    const data = await message.create({
      message: messageBody,
      userId: req.user.id,
      groupId: req.user.id,
      userName: req.user.name,
    });
    res.json({ message: data, success: true });
  } catch (err) {
    res.status(500).json({ message: "Message Not Send", err });
  }
};

let groupIds;

exports.all_message = async (req, res) => {
  try {
    groupIds = req.header("Authorization");
    const data = await message.findAll({ where: { groupId: groupIds } });
    res.json({ allData: data });
  } catch (error) {
    console.log(error);
    res.json({ error: error, success: false });
  }
};

exports.getAllUser = async (res, res) => {
  try {
    const data = await signup.findAll();
    res.json({ allUser: data });
  } catch (err) {
    console.log("error in add to group", err);
  }
};

exports.addToGroup = async (res, res) => {
  try {
    const userId = req.user.id;
    const groupId = req.body.groupId;
    console.log(userId, groupId);
    const data = await userGroupDb.create({
      userId: userId,
      groupNameId: groupId,
    });
    res.json({ groupAdd: data });
  } catch (err) {
    console.log("error in add to group", err);
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await userGroupDb.findAll({
      where: { groupNameId: groupIds },
    });
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      const id = data[i].dataValues.userId;
      const data2 = await signup.findOne({ where: { id: id } });
      arr.push(data2.dataValues);
    }
    res.json({ allUser: arr, isAdmin: data });
  } catch (error) {}
};

exports.removeMember = async (req, res) => {
  try {
    const userId = req.body.userId;
    const groupId = req.body.groupId;
    const data = await userGroupDb.findOne({
      where: { userId: userId, groupNameId: groupId },
    });
    data.destroy();
  } catch (e) {
    console.log("error in remove method", e);
  }
};
