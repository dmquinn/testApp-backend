const router = require("express").Router();

const mongoose = require("mongoose");

const Project = require("../models/Project.model");
const Post = require("../models/Post.model");
const User = require("../models/User.model");

//  POST /api/projects  -  Creates a new project
router.get("/posts", (req, res, next) => {
  Post.find()
    .then((allPosts) => res.json(allPosts))
    .catch((err) => res.json(err));
});

router.post("/posts", (req, res, next) => {
  const { title, description, image, user } = req.body;
  console.log(req.body);
  Post.create({ title, description, image, user }).then((newPost) => {
    return User.findByIdAndUpdate(user._id, {
      $push: { posts: newPost._id },
    })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  });
});

router.get("/posts/:postId", (req, res, next) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Each Project document has a `tasks` array holding `_id`s of Task documents
  // We use .populate() method to get swap the `_id`s for the actual Task documents
  Post.findById(postId)
    .then((post) => {
      console.log(post);
      res.status(200).json(post);
    })
    .catch((error) => res.json(error));
});

router.post("/posts/:postId/like", (req, res, next) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Each Project document has a `tasks` array holding `_id`s of Task documents
  // We use .populate() method to get swap the `_id`s for the actual Task documents
  Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } })
    .then((post) => {
      console.log(post);
      res.status(200).json(post);
    })
    .catch((error) => res.json(error));
});

// PUT  /api/projects/:projectId  -  Updates a specific project by id
router.put("/projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findByIdAndUpdate(projectId, req.body, { new: true })
    .then((updatedProject) => res.json(updatedProject))
    .catch((error) => res.json(error));
});

// DELETE  /api/projects/:projectId  -  Deletes a specific project by id
router.delete("/projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findByIdAndRemove(projectId)
    .then(() =>
      res.json({
        message: `Project with ${projectId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
