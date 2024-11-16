const mongoose = require("mongoose");

const messageSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // User who sent the message
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // User who received the message
    content: { type: String, required: true },
    status: { type: String, enum: ["sent", "read"], default: "sent" }, // Message status
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
