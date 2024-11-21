import type { Document } from "mongoose"
import type mongoose from "mongoose"

export type MessageModel = Document &
  Pick<IMessage, "message"> & {
    _id: mongoose.Types.ObjectId
    senderId: mongoose.Types.ObjectId
    receiverIds: mongoose.Types.ObjectId[]
    chatId: mongoose.Types.ObjectId
  }

export interface IMessage {
  id: string
  senderId: string
  receiverIds: string[]
  chatId: string
  message: string
}
