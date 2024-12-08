const express = require("express");
const router = express.Router();
const donationTransactionRouter = require("../controllers/donationTransactionController");

// POST route to create a new transaction
router.post(
  "/donation-transaction",
  donationTransactionRouter.createDonationTransaction
);
router.get(
  "/all-donationtrans",
  donationTransactionRouter.getAllDonationTransactions
);

router.get(
  "/all-donationtrans/donor/:donorId",
  donationTransactionRouter.getDonationsByDonorId
);

module.exports = router;
