import mongoose from "mongoose"
import type { MessageModel } from "../types/message"

const messageSchema = new mongoose.Schema<MessageModel>(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const Message = mongoose.model<MessageModel>("Message", messageSchema)

export default Message
