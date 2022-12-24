const express = require("express");
const router = express.Router();

const {
  getAllUser,
  getAUser,
  getUserById,
  updateUser,
} = require("../controllers/user");
const { IsSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

//update a user details
router.put("/user/:userId", IsSignedIn, isAuthenticated, updateUser);

//get all users details
router.get(
  "/alluser/:userId",
  IsSignedIn,
  isAdmin,
  isAuthenticated,
  getAllUser
);

//get a single user detail
router.get("/user/:userId", IsSignedIn, isAuthenticated, isAdmin, getAUser);

module.exports = router;
