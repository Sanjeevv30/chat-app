const GroupDb = require("../models/group");
const UserGroup = require("../models/userGroup");

exports.addGroup = async (req, res) => {
  try {
    const name = req.body.name;
    console.log(name);
    const data = await GroupDb.create({
      group: name,
    });
    const grp = data.dataValues.id;
    const response = await UserGroup.create({
      group: grp,
      userId: req.user.id,
      isAdmin: true,
    });
    res.json({ data: data});
  } catch (err) {
    console.log("error in addGroup backend", err);
    res.status(500).json({ message: "Error occur during add Group", err: err });
  }
};

exports.getGroup = async (req, res) => {
  try {
    const id = req.user.id;
    const data = await UserGroup.findAll({ where: { userId: id } });
    console.log("data", data);
    const nameArr = [];
    const idArr = [];
    for (let i = 0; i < data.length; i++) {
      const groupNameId = data[i].dataValues.group;
      const group = await GroupDb.findAll({ where: { id: groupNameId } });
      group.forEach((ele2) => {
        let name = ele2.dataValues.group;
        let id = ele2.dataValues.id;
        idArr.push(id);
        nameArr.push(name);
      });
    }
    res.json({ groupNames: nameArr, groupId: idArr });
  } catch (err) {
    console.log("error getAllGroupNames", err);
    res.json({ Error: err });
  }
};
