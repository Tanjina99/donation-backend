const status = require("http-status");
const generateToken = require("../utils/token");
const response = require("../utils/response");
const User = require("../models/UserModel");

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

  if (user.status === "block") {
    res
      .status(status.status.FORBIDDEN)
      .send(
        response.createErrorResponse(status.status.FORBIDDEN, "User is blocked")
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

//get all user
//update user role

const getAllUsers = async (req, res) => {
  try {
    const result = await User.find();
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "All user data retrieved successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error retrieving all users",
          error
        )
      );
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Validate the new role
    if (!["user", "admin"].includes(role)) {
      return res
        .status(status.status.BAD_REQUEST)
        .send(
          response.createErrorResponse(
            status.status.BAD_REQUEST,
            "Invalid role. Allowed values are 'user' or 'admin' only."
          )
        );
    }

    // Update the user's role
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );

    // Check if user exists
    if (!updatedUser) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            "User not found"
          )
        );
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "User role updated successfully",
          updatedUser
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error updating user role",
          error.message
        )
      );
  }
};

//make update for user status: block or active

module.exports = {
  signup,
  signin,
  getAllUsers,
  updateUserRole,
};
