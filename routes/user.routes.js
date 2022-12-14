const router = require("express").Router();

const mongoose = require("mongoose");

const Project = require("../models/Project.model");
const Post = require("../models/Post.model");
const User = require("../models/User.model");

//  POST /api/projects  -  Creates a new project
router.get("/users", (req, res, next) => {
  User.find()
    .then((allUsers) => res.json(allUsers))
    .catch((err) => res.json(err));
});

module.exports = router;
