// Create and send token and save in the cookie

const sendTokenNhanvien = (nhanvien, statusCode, res) => {
  // Create Jwt token
  const tokennhanvien = nhanvien.getJwtToken();

  // Options for the cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("tokennhanvien", tokennhanvien, options).json({
    success: true,
    tokennhanvien,
    nhanvien,
  });
};

module.exports = sendTokenNhanvien;
