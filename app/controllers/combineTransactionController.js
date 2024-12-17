const status = require("http-status");
const response = require("../utils/response");
const DonationTransaction = require("../models/DonationTransaction");
const FundRaisingTransaction = require("../models/FundRaisingTransaction");

const getAllTransactionsCombined = async (req, res) => {
  try {
    // Fetch donation transactions
    const donationTransactions = await DonationTransaction.find()
      .populate("donorId")
      .populate("donationId");

    // Fetch fundraising transactions
    const fundRaisingTransactions = await FundRaisingTransaction.find()
      .populate("donorId")
      .populate("fundRaisingId");

    console.log(fundRaisingTransactions);

    const result = [...donationTransactions, ...fundRaisingTransactions];

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Transactions retrieved successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "An error occurred while fetching combined transactions",
          error
        )
      );
  }
};

//const get transaction by Id
const getTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const allDonationTransactionById = await DonationTransaction.find({
      donorId: id,
    })
      .populate("donorId")
      .populate("donationId");

    const allFundraisingTransactionById = await FundRaisingTransaction.find({
      donorId: id,
    })
      .populate("donorId")
      .populate("fundRaisingId");

    const result = [
      ...allDonationTransactionById,
      ...allFundraisingTransactionById,
    ];

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Transactions retrieved successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "An error occurred while fetching combined transactions",
          error
        )
      );
  }
};

module.exports = {
  getAllTransactionsCombined,
  getTransactionById,
};
