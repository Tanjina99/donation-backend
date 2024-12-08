const express = require("express");
const router = express.Router();
const fundRaisingRouter = require("../controllers/fundRaisingController");

router.post("/create-fund", fundRaisingRouter.createFund);
router.get("/fundraiser", fundRaisingRouter.getAllFund);
router.get("/fundraiser/:id", fundRaisingRouter.getSingleFundById);
router.put("/fundraiser/:id", fundRaisingRouter.updateSingleFund);
router.delete("/fundraiser/:id", fundRaisingRouter.deleteFund);

module.exports = router;
