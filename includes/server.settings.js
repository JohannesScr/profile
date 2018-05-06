log_url = (req, res, next) => {
    console.log(`##> ${req.method} ${req.url}`);
    console.log('body:', req.body);
    next();
};

function add_result_object(req, res, next) {
    req.result = {
        http_code: 200,
        message: '',
        data: {},
        errors: []
    };
    req.data = {};
    next();
}

module.exports = {
    add_result_object,
    log_url
};