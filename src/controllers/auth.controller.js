exports.login = (req, res) => {
  const { password } = req.body;

  if (password === "enter@123") {
    return res.json({
      success: true,
      message: "Login successful"
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid password"
  });
};