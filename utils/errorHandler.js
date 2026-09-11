const customError = (message = "internal error", statusCode = 500) => {
    const newError = new Error(message);
    newError.statusCode = statusCode;
    throw newError;
};

const errorMiddleware = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    console.log("error:", error.message, statusCode)
    res.status(statusCode).json({
        status : statusCode,
        message : error.message,
    })
    next()
}

module.exports = {customError, errorMiddleware};