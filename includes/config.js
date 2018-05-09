const setup_environment = () => {
    let env = process.env.ENV || 'development';

    if (env === 'development' || env === 'test') {
        let config = require('./config.json');
        config = config[env];

        let keys = Object.keys(config);
        keys.forEach(key => {
            process.env[key] = config[key];
        });
    }
};

const setup_config = () => {
    let config = require('./general_config.json');

    let keys = Object.keys(config);
    keys.forEach(key => {
        process.env[key] = config[key];
    });
};

module.exports = {
    setup_environment,
    setup_config
};