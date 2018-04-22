const log_url = (req, res, next) => {
    console.log(`##> ${req.method} ${req.url}`);
    next();
};

module.exports = {
    log_url
};