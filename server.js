const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// local imports
const {setup_environment} = require('./includes/config');
const {log_url, add_result_object} = require('./includes/server.settings');
const {google_maps_distance} = require('./routes/google_maps');
let app = express();

setup_environment();
let PORT = process.env.PORT || 3010;

// default html
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(add_result_object);
app.use(log_url);

app.get('/hbs', (req, res) => {
    res.render('about.hbs');
});

app.get('/test_ajax', (req, res) => {
    res.json({
        test: 'This is a test',
        status: 'successful'
    });
});

// ########################
// API REQUESTS
app.post('/google_maps', google_maps_distance);

app.listen(PORT, () => {
    console.log(`################ ${process.env.ENV_NAME} ################`);
    console.log(`Express app running on port: ${PORT}`);
});