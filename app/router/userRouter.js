const express = require("express");
const router = express.Router();
const userRouter = require("../controllers/userController");

router.post("/signup", userRouter.signup);
router.post("/signin", userRouter.signin);
router.get("/all-users", userRouter.getAllUsers);
router.patch("/all-users/:id", userRouter.updateUserRole);

module.exports = router;
