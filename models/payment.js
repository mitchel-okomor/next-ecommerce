import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Types.ObjectId,
      ref: "order",
    },
    message: String,
    reference: String,
    status: String,
    trans: String,
    transaction: String,
    trxref: String,
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.order || mongoose.model("payment", paymentSchema);

export default Dataset;
