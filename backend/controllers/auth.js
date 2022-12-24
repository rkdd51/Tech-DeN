const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  "501834169926-3se3mm2s4568jhchs064b5of1tklfuna.apps.googleusercontent.com"
);

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          error: "Email already exist. Please try another email",
        });
      }
      return res.status(400).json({
        error: error,
      });
    }
    res.json({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    try {
      if (err !== null) {
        res.status(400).json({
          error: "server error",
        });
      }
      if (!user) {
        return res.status(400).json({
          error: "not a registered email",
        });
      }
      if (user && user.authenticate(password) === false) {
        return res.status(401).json({
          error: "Email and password doesn't match",
        });
      }
      //create token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);

      //put token in cookie
      res.cookie("token", token, { expire: new Date() + 9999 });

      //send response to front end
      const { _id, firstname, email, role } = user;
      return res.json({ token, user: { _id, firstname, email, role } });
    } catch (error) {
      console.log(error);
    }
  });
};

//protected routes
exports.IsSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

//signout
exports.signout = (req, res) => {
  res.clearCookie("token");
  console.log(res.cookie);
  res.json({
    message: "user sign-out successfully",
  });
};

//custom middleware
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "ACCESS DENIED!!! [You are not admin]",
    });
  }

  next();
};

exports.googlelogin = (req, res) => {
  const { tokenId } = req.body;

  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "501834169926-3se3mm2s4568jhchs064b5of1tklfuna.apps.googleusercontent.com",
    })
    .then((response) => {
      const { email_verified, name, email, given_name } = response.payload;
      console.log(response.payload);
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (err) {
            return res.status(400).json({
              error: "server error",
            });
          } else {
            if (user) {
              //create token
              const token = jwt.sign({ _id: user._id }, process.env.SECRET);
              //put token in cookie
              res.cookie("token", token, { expire: new Date() + 9999 });

              //send response to front end
              const { _id, firstname, email, role } = user;
              return res.json({ token, user: { _id, firstname, email, role } });
            } else {
              let password = email + process.env.SECRET;
              let newUser = new User({
                firstname: given_name,
                email: email,
                password: password,
              });
              newUser.save((err, data) => {
                if (err) {
                  return res.status(400).json({
                    error: "not able to save in db",
                  });
                }
                //create token
                const token = jwt.sign({ _id: data._id }, process.env.SECRET);
                //put token in cookie
                res.cookie("token", token, { expire: new Date() + 9999 });

                //send response to front end
                const { _id, firstname, email, role } = newUser;
                return res.json({
                  token,
                  user: { _id, firstname, email, role },
                });
              });
            }
          }
        });
      }
    });
};
