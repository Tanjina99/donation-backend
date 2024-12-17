const status = require("http-status");
const response = require("../utils/response");
const DonationTransaction = require("../models/DonationTransaction");
const Donation = require("../models/DonationModel");

//create donationtran
const createDonationTransaction = async (req, res) => {
  try {
    const { donorId, donationId, amount, message } = req.body;
    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res
        .status(status.status.NOT_FOUND)
        .send(response.status.status.NOT_FOUND, "Donation is not found");
    }

    //update the donation amount
    donation.amount += amount;
    await donation.save();

    const transaction = new DonationTransaction({
      donorId,
      donationId,
      amount,
      message,
    });

    await transaction.save();

    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessResponse(
          status.status.CREATED,
          "Transaction made successfully"
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

const getAllDonationTransactions = async (req, res) => {
  try {
    const { donorId } = req.query;

    let query = {};
    if (donorId) {
      query.donorId = donorId;
    }

    const transactions = await DonationTransaction.find(query)
      .populate("donorId")
      .populate("donationId")
      .exec();

    if (transactions.length === 0) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            "No transactions found for the given donor ID"
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

const getDonationsByDonorId = async (req, res) => {
  try {
    const { donorId } = req.params;

    const transactions = await DonationTransaction.find({
      donorId: donorId,
    }).populate("donorId");

    if (transactions.length === 0) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            "No donations transactions found for the given donor ID"
          )
        );
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Donations transactions retrieved successfully",
          transactions
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "An error occurred while fetching donations",
          error
        )
      );
  }
};

module.exports = {
  createDonationTransaction,
  getAllDonationTransactions,
  getDonationsByDonorId,
};
