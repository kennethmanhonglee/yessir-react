const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check, validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
];

router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const { email, password, username } = req.body;

    if (errors.isEmpty()) {
      const user = await User.signup({ email, username, password });
      await setTokenCookie(res, user); //set token in response with user info
      return res.json({ user });
    } else {
      return res.status(401).json(errors);
    }
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await User.findAll();

    res.json(users);
  })
);

module.exports = router;
