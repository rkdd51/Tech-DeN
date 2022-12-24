const Group = require("../models/group.js");

exports.creategroup = (req, res) => {
  console.log(req.body);
 
  const group = new Group({
    groupname: req.body.groupname,
    description: req.body.description,
    link: req.body.link,
  });
  group.save((error, group) => {
    if (error) {
      return res.status(400).json({
        error: error.errmsg,
      });
    } else {
      res.json({
        groupname: group.groupname,
        description: group.description,
        link: group.link,
        id: group._id,
      });
    }
  });
};

exports.getAllGroup = (req, res) => {
  Group.find().exec((err, groups) => {
    if (err || !groups) {
      return res.status(400).json({
        err: "No group",
      });
    }
    res.json(groups);
  });
};


exports.deleteGroup = (req, res) => {
  console.log(req.body.id);
}; 