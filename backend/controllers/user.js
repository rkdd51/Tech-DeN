const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user found in DB",
      });
    }

    req.profile = user;

    next();
  });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        res.status(400).json({
          err: "You r not authorized to update",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};

exports.getAllUser = (req, res) => {
  User.find().exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({
        err: "No USERS!!!",
      });
    }
    res.json(users);
  });
};

exports.getAUser = (req, res) => {
  User.findOne({ name: "ganesha02" }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user exist",
      });
    }
    res.json(user);
  });
};
