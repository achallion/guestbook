function logger(req, res, next) {
    console.log(`${req.method} at ${req.url}`);
    next();
}

module.exports = logger