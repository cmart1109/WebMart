function errorHandler(err, req,res,next) {
    console.log(err);
    const status = err.status || 500;
    const message = err.message || 'There is an error'
    res.status(status).json({
        error:message
    });
}

module.exports = errorHandler;