const errorMiddleware = (err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Internal Server Error!';

  // console.log(err);
  return res.status(errorStatus).json({ 
    success: false,
    errorStatus, 
    errorMessage
  });
}

module.exports = { errorMiddleware };