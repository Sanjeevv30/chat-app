const Signup = require("../models/signup");
const bcrypt = require("bcrypt");
const util = require("../util/database");
const jwt = require("jsonwebtoken");

exports.generateJwt = (id, name) => {
  return jwt.sign({ userId: id, name: name }, "secretKey");
};

function validation(e) {
  if (e == null || e == undefined || e.length == 0) {
    return true;
  } else {
    return false;
  }
}

exports.createSignup = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    if (
      validation(name) ||
      validation(email) ||
      validation(phoneNumber) ||
      validation(password)
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Signup.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      console.log("User already exists");
      return res
        .status(400)
        .json({ message: "User already exists", existingUser: true });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSignup = await Signup.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({
        message: "SignUp successfully",
        signup: newSignup,
        existingUser: false,
      });
  } catch (error) {
    console.log("Error creating signup:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllSignUp = async (req, res) => {
  try {
    const signup = await Signup.findAll();
    res.json(signup);
  } catch (err) {
    console.log("Error retrieving Signup:", err);
    res.status(500).json({ err: "Server error" });
  }
};

exports.createLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (validation(email) || validation(password)) {
      return res.status(400).json({ message: "Field required" });
    }
    const user = await Signup.findAll({ where: { email: email } });
    console.log("user", user);
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, resp) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "User not authorized" });
        }
        if (resp) {
          return res
            .status(201)
            .json({
              message: "User Login Successful",
              user,
              token: exports.generateJwt(user[0].id, user[0].name),
            });
        } else {
          //console.log(resp);
          return res.status(400).json({ message: "Password not authorized" });
        }
      });
    } else {
      return res.status(404).json({ message: "User not authorized" });
    }
  } catch (err) {
    console.log("Error retrieving Signup:", err);
    res.status(500).json({ err: "Server error" });
  }
};
