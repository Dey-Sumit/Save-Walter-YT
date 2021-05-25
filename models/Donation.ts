import { IDonation } from "@libs/types";
import mongoose, { Document } from "mongoose";

type DonationDocument = Document & IDonation;

const DonationSchema = new mongoose.Schema<DonationDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models.Donation as mongoose.Model<DonationDocument>) ||
  mongoose.model<DonationDocument>("Donation", DonationSchema);
