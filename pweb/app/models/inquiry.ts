import mongoose, { Schema } from "mongoose";

const InquirySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    service: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: "new" }, // new | read | archived
  },
  { timestamps: true }
);

export default mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);