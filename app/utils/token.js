const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      imageUrl: user.imageUrl,
      role: user.role,
    },
    process.env.TOKEN,
    { expiresIn: process.env.TOKEN_EXPIRATION }
  );

  return token;
};

module.exports = generateToken;
