// Create and send token and save in the cookie

const sendTokenShipper = (shipper, statusCode, res) => {
  // Create Jwt token
  const tokenshipper = shipper.getJwtToken();

  // Options for the cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("tokenshipper", tokenshipper, options).json({
    success: true,
    tokenshipper,
    shipper,
  });
};

module.exports = sendTokenShipper;
