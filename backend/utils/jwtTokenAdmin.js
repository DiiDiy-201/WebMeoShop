// Create and send token and save in the cookie

const sendTokenAdmin = (admin, statusCode, res) => {
  // Create Jwt token
  const tokenadmin = admin.getJwtToken();

  // Options for the cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("tokenadmin", tokenadmin, options).json({
    success: true,
    tokenadmin,
    admin,
  });
};

module.exports = sendTokenAdmin;
