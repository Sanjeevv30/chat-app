const express = require("express");
const route = express.Router();
const userAuth = require("../middlewares/authorize");
const group = require("../controllers/group");

route.post("/add", userAuth.authenticate, group.addGroup);
route.get("/", userAuth.authenticate, group.getGroup);

module.exports = route;
