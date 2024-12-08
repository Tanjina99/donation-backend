const User = require("../models/userModel");
const status = require("http-status");
const generateToken = require("../utils/token");
const response = require("../utils/response");

const signup = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const result = await newUser.save();
    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessResponse(
          status.status.CREATED,
          "User created Successfully!",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured creating user",
          error
        )
      );
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(status.status.NOT_FOUND)
      .send(
        response.createErrorResponse(status.status.NOT_FOUND, "User not found")
      );
  }

  const isMatched = await user.comparePassword(password);
  if (!isMatched) {
    return res
      .status(status.status.UNAUTHORIZED)
      .send(
        response.createErrorResponse(
          status.status.UNAUTHORIZED,
          "Credentials not matched"
        )
      );
  }

  const token = generateToken(user);
  //   console.log(token);

  res.cookie("accessToken", token, {
    httpOnly: false,
    secure: true,
    maxAge: 60 * 60 * 1000,
  });

  res
    .status(status.status.OK)
    .send(
      response.createSuccessResponse(
        status.status.OK,
        "User logged in successfully"
      )
    );
};

module.exports = {
  signup,
  signin,
};
