const mongoose = require("mongoose");
const commentSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true }, // Reference to the post being commented on
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who commented
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;