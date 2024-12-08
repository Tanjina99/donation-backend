const status = require("http-status");
const response = require("../utils/response");
const Donation = require("../models/DonationModel");

const createDonation = async (req, res) => {
  try {
    const newDonation = new Donation(req.body);
    const result = await newDonation.save();
    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessResponse(
          status.status.CREATED,
          "New donation created Successfully!",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.INTERNAL_SERVER_ERROR,
          "Error creating new donation",
          error
        )
      );
  }
};

const getAllDonation = async (req, res) => {
  try {
    const result = await Donation.find();
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "All donation data retrieve successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.INTERNAL_SERVER_ERROR,
          "Error retrieving all donation",
          error
        )
      );
  }
};

const getSingleDonationById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Donation.findById(id);

    if (!result) {
      res
        .status(status.status.NOT_FOUND)
        .send(response.status.status.NOT_FOUND, "Donation by Id is not found");
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Donation byId data retrieve successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error retrieving all donations",
          error
        )
      );
  }
};

const updateSingleDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await Donation.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!result) {
      res
        .status(status.status.NOT_FOUND)
        .send(response.status.status.NOT_FOUND, "Donation by Id is not found");
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Donation byId updated successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error updating donations by single Id",
          error
        )
      );
  }
};

const deleteDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Donation.findByIdAndDelete(id, { new: true });
    if (!result) {
      res
        .status(status.status.NOT_FOUND)
        .send(response.status.status.NOT_FOUND, "Donation not found");
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Donation deleted successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured deleting donation",
          error
        )
      );
  }
};
module.exports = {
  createDonation,
  getAllDonation,
  getSingleDonationById,
  updateSingleDonation,
  deleteDonation,
};
