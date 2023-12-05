const express = require("express");
const route = express.Router();
const userAuth = require("../middlewares/authorize");
const group = require("../controllers/groupController");

route.post("/addgroup", userAuth.authenticate, group.addGroup);
route.get("/getname", userAuth.authenticate, group.getGroup);

module.exports = route;
