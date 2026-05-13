import mongoose, { Schema } from "mongoose";
import { INews } from "../types/types";

const NewsSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    immutable: true,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  dateAdded: {
    type: Date,
    immutable: true,
    default: Date.now,
  },
  dateModified: {
    type: Date,
    default: Date.now,
  },
  lastUpdatedBy: {
    type: String,
  },
  pictures: [
    {
      type: String,
    },
  ],
});
NewsSchema.pre("save", function () {
  this.dateModified = new Date();
});
export const News = mongoose.model<INews>("News", NewsSchema);
