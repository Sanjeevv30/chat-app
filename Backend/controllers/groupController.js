const message = require("../models/message");
require("dotenv").config();
const groupDb = require("../models/group");
const userGroupDb = require("../models/user-group");

exports.addGroup = async (req, res) => {
  try {
    const gname = req.body.gname;
    console.log(gname);
    const data = await groupDb.create({
      groupName: gname,
    });
    const grp = data.dataValues.id;
    const response = await userGroupDb.create({
      groupNameId: grp,
      userId: req.user.id,
      isAdmin: true,
    });
    res.json({ data: data });
  } catch (err) {
    console.log("error in addGroup backend", err);
    res.status(500).json({ message: "Error occur during add Group", err: err });
  }
};

exports.getGroup = async (req, res) => {
  try {
    const id = req.user.id;
    const data = await userGroupDb.findAll({ where: { userId: id } });
    console.log("data", data);
    const namearr = [];
    const idarr = [];
    for (let i = 0; i < data.length; i++) {
      const groupNameId = data[i].dataValues.groupNameId;
      const groupName = await groupDb.findAll({ where: { id: groupNameId } });
      console.log(groupName);
      console.log(groupNameId);
      groupName.forEach((ele2) => {
        let name = ele2.dataValues.groupName;
        let id = ele2.dataValues.id;
        idarr.push(id);
        namearr.push(name);
      });
    }
    res.json({ groupNames: namearr, groupId: idarr });
  } catch (err) {
    console.log("error getAllGroupNames", err);
    res.json({ Error: err });
  }
};
