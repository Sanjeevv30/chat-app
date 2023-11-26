const Signup = require("../models/signup");
const bcrypt = require("bcrypt");
const util = require('../util/database')

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
    console.log('Phone Number:', phoneNumber);

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
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
    const newSignup = await Signup.create({
      name,
      email,
      phoneNumber:cleanPhoneNumber,
      password: hashedPassword,
    });

    res.status(201).json({ message: "SignUp successfully", signup: newSignup });
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
