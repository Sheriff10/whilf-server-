const express = require("express");
const { login } = require("../controllers/loginController");
const { signup } = require("../controllers/signupController");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
