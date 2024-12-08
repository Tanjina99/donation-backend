const mongoose = require("mongoose");
const { Schema } = mongoose;

const fundRaisingTransactionSchema = new Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fundRaisingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FundRaising",
      required: true,
    },
    amount: { type: Number, required: true },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

const FundRaisingTransaction = mongoose.model(
  "FundRaisingTransaction",
  fundRaisingTransactionSchema
);

module.exports = FundRaisingTransaction;
