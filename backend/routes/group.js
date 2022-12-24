const express = require("express");
const router = express.Router();
const Group = require("../models/group.js");

const { creategroup, getAllGroup } = require("../controllers/group");

router.post("/creategroup", creategroup);
router.get("/getallgroup", getAllGroup);

//delete route
router.delete("/deletegroup/:id", (req, res) => {
  Group.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});


module.exports = router;
