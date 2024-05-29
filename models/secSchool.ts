import mongoose, { Document, Schema } from "mongoose";

export interface School extends Document {
  name: string;
  location?: string;
}

const SchoolSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String },
});

export default mongoose.model<School>("School", SchoolSchema);
