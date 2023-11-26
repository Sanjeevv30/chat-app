const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupController");
router.post("/add-user/Signup", signupController.createSignup);
router.get("/get-user/signup", signupController.getAllSignUp);
module.exports = router;
