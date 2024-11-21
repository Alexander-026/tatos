import type { Document } from "mongoose"
import type mongoose from "mongoose"

export interface IToken extends Document {
  user: mongoose.Schema.Types.ObjectId
  refreshToken: string
}

export interface IGeneratedTokens {
  accessToken: string
  refreshToken: string
}
