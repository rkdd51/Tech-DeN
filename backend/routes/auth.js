const express = require("express");
const router = express.Router();
const { signup, signin, signout, googlelogin } = require("../controllers/auth");
const { check } = require("express-validator");

router.post(
  "/signup",
  [
    check("firstname", "firstname should be at least of 3 Char").isLength({
      min: 3,
    }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password filed is required").isLength({ min: 3 }),
  ],
  signin
);

router.get("/signout", signout);

router.post("/googlelogin", googlelogin);

module.exports = router;
