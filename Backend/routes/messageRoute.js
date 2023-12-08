const express = require("express");
const route = express.Router();
const message = require("../controllers/message-controller");
const userAuthenticate = require("../middlewares/authorize");

route.post("/messagess", userAuthenticate.authenticate, message.message);
route.get("/all-messages", message.all_message);
route.post("/addToGroup", message.addToGroup);
route.get("/getuser", userAuthenticate.authenticate, message.getUser);
route.get("/allusers", message.getAllUser);
route.post("/removeMember", message.removeMember);
route.post("/addAdmin",message.addAdmin);

module.exports = route;
