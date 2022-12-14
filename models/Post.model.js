const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: String,
  description: String,
  image: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  likes: { type: Number, default: 0 },
});

module.exports = model("Post", postSchema);
