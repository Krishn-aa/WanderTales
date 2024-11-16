const mongoose = require("mongoose");
const likeSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true }, // Reference to the liked post
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who liked the post
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
