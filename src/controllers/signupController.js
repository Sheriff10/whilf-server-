const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Account created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again." });
  }
};
