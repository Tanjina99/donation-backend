const FundRaising = require("../models/FundRaisingModel");
const status = require("http-status");
const response = require("../utils/response");
const FundRaisingTransaction = require("../models/FundRaisingTransaction");

//create transaction
const createTransaction = async (req, res) => {
  try {
    console.log(req.body);
    const { donorId, fundRaisingId, amount, message } = req.body;
    const fundRaising = await FundRaising.findById(fundRaisingId);
    console.log(fundRaising);
    if (!fundRaising) {
      return res
        .status(status.status.NOT_FOUND)
        .send(response.status.status.NOT_FOUND, "Fundraising is not found");
    }

    fundRaising.raisedAmount += amount;
    const result = await fundRaising.save();

    const transaction = new FundRaisingTransaction({
      donorId,
      fundRaisingId,
      amount,
      message,
    });

    await transaction.save();

    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessResponse(
          status.status.CREATED,
          "Transaction made successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "An error occured during making a transaction",
          error
        )
      );
  }
};

//get all transactions
const getAllTransactions = async (req, res) => {
  try {
    //.populate("userId") tells Mongoose to replace the userId field with the full User document.
    //This allows you to access the full User data (name, email..) instead of just the ObjectId.
    const transactions = await FundRaisingTransaction.find().populate(
      "donorId fundRaisingId"
    );

    if (transactions.length === 0) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            "No transactions found"
          )
        );
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Transactions retrieved successfully",
          transactions
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "An error occurred while fetching transactions",
          error
        )
      );
  }
};

// Get transactions by donorId
const getTransactionByDonorId = async (req, res) => {
  try {
    const { donorId } = req.params;

    const transactions = await FundRaisingTransaction.find({
      donorId,
    }).populate("fundRaisingId");

    if (transactions.length === 0) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            `No transactions found for donor with ID ${donorId}`
          )
        );
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Transactions retrieved successfully",
          transactions
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "An error occurred while fetching transactions by donorId",
          error
        )
      );
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionByDonorId,
};
