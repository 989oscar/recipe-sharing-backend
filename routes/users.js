const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });
    res.json(newUser);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json("User not found");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json("Invalid password");
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    res.json({ token });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
