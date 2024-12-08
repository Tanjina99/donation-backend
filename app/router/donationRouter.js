const express = require("express");
const router = express.Router();
const donationRouter = require("../controllers/donationController");

router.post("/create-donation", donationRouter.createDonation);
router.get("/donations", donationRouter.getAllDonation);
router.get("/donations/:id", donationRouter.getSingleDonationById);
router.put("/donations/:id", donationRouter.updateSingleDonation);
router.delete("/donations/:id", donationRouter.deleteDonation);

module.exports = router;
