const FundRaising = require("../models/FundRaisingModel");
const status = require("http-status");
const response = require("../utils/response");

const createFund = async (req, res) => {
  try {
    const newFund = new FundRaising(req.body);
    const result = await newFund.save();
    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessResponse(
          status.status.CREATED,
          "NewFund created Successfully!",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured creating new fund",
          error
        )
      );
  }
};

const getAllFund = async (req, res) => {
  try {
    const result = await FundRaising.find();
    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessResponse(
          status.status.CREATED,
          "Fundraiser created Successfully!",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured creating fundraiser",
          error
        )
      );
  }
};

const getSingleFundById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await FundRaising.findById(id);

    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.status.status.NOT_FOUND,
          "Fundraising by Id is not found"
        );
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Fundraising byId data retrieve successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error retrieving all fundraising",
          error
        )
      );
  }
};

const updateSingleFund = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFund = req.body;

    const result = await FundRaising.findByIdAndUpdate(id, updateFund, {
      new: true,
    });

    if (!result) {
      res
        .status(status.status.NOT_FOUND)
        .send(response.status.status.NOT_FOUND, "Fundraise by Id is not found");
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Fundraise byId updated successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error updating Fundraise by single Id",
          error
        )
      );
  }
};

const deleteFund = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await FundRaising.findByIdAndDelete(id, { new: true });
    if (!result) {
      res
        .status(status.status.NOT_FOUND)
        .send(response.status.status.NOT_FOUND, "Fundraising not found");
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Fundraising deleted successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured deleting Fundraising",
          error
        )
      );
  }
};

module.exports = {
  createFund,
  getAllFund,
  getSingleFundById,
  updateSingleFund,
  deleteFund,
};
