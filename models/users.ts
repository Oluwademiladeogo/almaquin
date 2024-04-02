import mongoose from "mongoose";
import { IUserDoc } from "../types";

export const User = mongoose.model<IUserDoc>(
  "Users",
  new mongoose.Schema<IUserDoc>({
    username: {
      //Will be a combination of first and last name
      type: String,
      minlength: 2,
      maxlength: 255,
      required: true,
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 255,
      required: true,
      unique: true,
    },
    phone_no: {
      type: String,
      minlength: 10,
      maxlength: 20,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 255,
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
  })
);
