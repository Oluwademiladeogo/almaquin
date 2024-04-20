import mongoose, { Schema } from "mongoose";

interface IFAQ {
  university: string;
  schoolsFAQs: { [question: string]: string };
  undergraduateFAQs: { [question: string]: string };
  postgraduateFAQs: { [question: string]: string };
}

const FAQSchema: Schema<IFAQ> = new Schema<IFAQ>({
  university: {
    type: String,
    required: true,
  },
  schoolsFAQs: {
    type: Map,
    of: String,
    default: {},
  },
  undergraduateFAQs: {
    type: Map,
    of: String,
    default: {},
  },
  postgraduateFAQs: {
    type: Map,
    of: String,
    default: {},
  },
});

export const FAQ = mongoose.model<IFAQ>("FAQ", FAQSchema);
