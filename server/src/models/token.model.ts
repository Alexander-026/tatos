import mongoose, { Schema } from "mongoose"
import type { IToken } from "../types/token"

const tokenSchema = new Schema<IToken>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  refreshToken: { type: String, required: true },
})

const Token = mongoose.model<IToken>("Token", tokenSchema)

export default Token
