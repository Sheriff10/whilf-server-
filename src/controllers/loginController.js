const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No account found with this email." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again." });
  }
};
