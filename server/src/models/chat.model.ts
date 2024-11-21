import mongoose from "mongoose"
import type { ChatModel } from "../types/chat"
import { ChatType } from "../types/chat"

const chatModel = new mongoose.Schema<ChatModel>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(ChatType), // Specify possible values ​​from enum
      default: ChatType.Duel,
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true },
)

const Chat = mongoose.model<ChatModel>("Chat", chatModel)

export default Chat
