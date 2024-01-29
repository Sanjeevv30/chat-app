const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signup");
router.post("/add-user/Signup", signupController.createSignup);
router.post('/login',signupController.createLogin);
router.get("/get-user/signup", signupController.getAllSignUp);

module.exports = router;
