const express = require("express");
const router = express.Router();
const combineTransactionRouter = require("../controllers/combineTransactionController");

router.get(
  "/transactions/combined",
  combineTransactionRouter.getAllTransactionsCombined
);

router.get(
  "/transactions/combined/:id",
  combineTransactionRouter.getTransactionById
);

module.exports = router;
