const express = require("express");
const route = express.Router();
const message = require("../controllers/message");
const userAuthenticate = require("../middlewares/authorize");

route.post("/messages", userAuthenticate.authenticate, message.message);
route.get("/all-messages", message.all_message);
route.post("/addToGroup", message.addToGroup);
route.get("/getUser", userAuthenticate.authenticate, message.getUser);
route.get("/allUsers", message.getAllUser);
route.post("/removeMember", message.removeMember);
route.post("/addAdmin",message.addAdmin);

module.exports = route;
