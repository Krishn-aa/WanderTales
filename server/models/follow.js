const mongoose=require("mongoose")

const followerSchema = new Schema({
    followerId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // User who follows
    followingId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // User being followed
  }, { timestamps: true });
  
  const Follower = mongoose.model('Follower', followerSchema);

  module.exports = Follow;