const express = require("express");
const router = express.Router();
const fundRaisingTransactionRouter = require("../controllers/fundRaisingTransactionController");

// POST route to create a new transaction
router.post(
  "/create-transaction",
  fundRaisingTransactionRouter.createTransaction
);

// GET route to retrieve all transactions
router.get("/transactions", fundRaisingTransactionRouter.getAllTransactions);

// GET route to retrieve transactions for a specific donor by donorId
router.get(
  "/transactions/donor/:donorId",
  fundRaisingTransactionRouter.getTransactionByDonorId
);

module.exports = router;
