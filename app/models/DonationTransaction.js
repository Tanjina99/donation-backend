const mongoose = require("mongoose");
const { Schema } = mongoose;

const donationTransactionSchema = new Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    donationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
    },
    amount: { type: Number, required: true },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

const DonationTransaction = mongoose.model(
  "DonationTransaction",
  donationTransactionSchema
);

module.exports = DonationTransaction;
