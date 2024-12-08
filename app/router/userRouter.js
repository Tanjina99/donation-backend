const express = require("express");
const router = express.Router();
const userRouter = require("../controllers/userController");

router.post("/signup", userRouter.signup);
router.post("/signin", userRouter.signin);

module.exports = router;
