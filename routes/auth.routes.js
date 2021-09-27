const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

const router = Router();

// /api/auth

router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Minimum length of password is 6 symbols").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      console.log("req.body", req.body);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect registration data ",
        });
      }
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        res.status(400).json({ message: "This user is already exist" });
      }

      const hashedPassord = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashedPassord });

      await user.save();
      res.status(201).json({ message: "User is created" });
    } catch (error) {
      res.status(500).json({ message: "Something get wrong, try again" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Please enter correct email").normalizeEmail(),
    check("password", "Password is incorrect").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect login data ",
        });
      }
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User is not find" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Passord is incorrecr, try again" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "12h",
      });

      res.json({ message: "Login is successful", token, userId: user.id });
    } catch (error) {
      res.status(500).json({ message: "Something get wrong, try again" });
    }
  }
);

module.exports = router;
