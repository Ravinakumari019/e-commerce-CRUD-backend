module.exports = (req, res, next) => {
  const password = req.headers["x-password"];

  if (password === "enter@123") {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
};