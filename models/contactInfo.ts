// Contact Model (models/contact.ts)
import mongoose, { Schema } from "mongoose";

interface IContact {
  phone: string;
  email: string;
  fax: string;
}

const ContactSchema: Schema<IContact> = new Schema<IContact>({
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fax: {
    type: String,
    required: true,
  },
});

export const Contact = mongoose.model<IContact>("Contact", ContactSchema);

