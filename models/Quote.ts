import { IQuote } from "@libs/types";
import mongoose, { Document } from "mongoose";

type QuoteDocumet = Document & IQuote;

const QuoteSchema = new mongoose.Schema<QuoteDocumet>({
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  pictureURL: {
    type: String,
    required: true,
  },
});

export default (mongoose.models.Quote as mongoose.Model<QuoteDocumet>) ||
  mongoose.model<QuoteDocumet>("Quote", QuoteSchema);
