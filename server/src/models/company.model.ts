import mongoose from "mongoose"
import type { CompanyModel } from "../types/company"
import { EmployeeLimit } from "../types/company"

const companyModel = new mongoose.Schema<CompanyModel>(
  {
    directorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        default: [],
      },
    ],
    name: {
      type: String,
      required: true,
      unique: true,
    },
    employeeLimit: {
      type: String,
      enum: Object.values(EmployeeLimit),
      default: EmployeeLimit.level1,
    },
  },
  { timestamps: true },
)

const Company = mongoose.model<CompanyModel>("Company", companyModel)

export default Company
