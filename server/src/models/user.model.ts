import mongoose from "mongoose"
import type { UserModel } from "../types/user"

const userSchema = new mongoose.Schema<UserModel>(
  {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    birthDate: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Director", "Manager", "Employee"],
      required: true,
      default: "Employee",
    },
    emailStatus: {
      type: String,
      enum: ["unconfirmed", "pending", "confirmed"],
      required: true,
      default: "unconfirmed",
    },
    image: { type: String, default: "" },
    wasOnline: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

const User = mongoose.model<UserModel>("User", userSchema)

export default User
