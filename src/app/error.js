function notFoundErrorHandler(_req, _res, next) {
    const error = new Error('Resource not found');
    error.status = 404;
    next(error);
}

function globalErrorHandler(error, _req, res, _next) {
    if (error.status) {
        return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Something went wrong' });
}

module.exports = { notFoundErrorHandler, globalErrorHandler };
