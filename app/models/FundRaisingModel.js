const mongoose = require("mongoose");
const { Schema } = mongoose;

const fundRaisingSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    targetedAmount: { type: Number, required: true },
    raisedAmount: { type: Number, required: true },
    daysLeft: { type: Number, required: true },
    category: { type: String, required: true },
    status: { type: String, enum: ["active", "completed"], default: "active" },
  },
  {
    timestamps: true,
  }
);

const FundRaising = mongoose.model("FundRaising", fundRaisingSchema);

module.exports = FundRaising;
