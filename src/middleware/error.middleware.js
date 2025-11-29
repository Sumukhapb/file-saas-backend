module.exports = (err, req, res, next) => {
  console.log("Error Occurred!!");

  const statusCode = err.statusCode || 500;
  const message = err.message || "Some error occurred!!";

  return res.status(statusCode).json({
    status: "Error",
    mssg: message,
  });
};
