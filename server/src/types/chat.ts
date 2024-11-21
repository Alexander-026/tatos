import type { Document } from "mongoose"
import type mongoose from "mongoose"

export enum ChatType {
  Group = "group",
  Duel = "duel",
}

export type ChatModel = Document &
  Pick<IChat, "type"> & {
    _id: mongoose.Types.ObjectId
    companyId: mongoose.Types.ObjectId
    participants: mongoose.Types.ObjectId[]
    messages: mongoose.Types.ObjectId[]
    createdAt: Date
    updatedAt: Date
  }

export interface IChat {
  id: string
  companyId: string
  type: ChatType
  participants: string[]
  messages: string[]
  createdAt: Date
  updatedAt: Date
}
