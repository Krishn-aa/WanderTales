const mongoose = require("mongoose");
const { Schema } = mongoose;
const PostSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String },
    description: {type: String },
    media: [{ type: String }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
