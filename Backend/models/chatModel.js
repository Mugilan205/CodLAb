import mongoose from "mongoose"

const chatSchema = mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },

    isGroupChat: {
      type: Boolean,
      default: false,
    },

    // Users participating in the chat
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },

    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    roomCode: {
      type: String,
      unique: true, // invite / join code
      ref:"Room"
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Chat", chatSchema);
