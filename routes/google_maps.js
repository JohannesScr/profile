const axios = require('axios');

// ######################################## HELPER FUNCTIONS

// ######################################## SECONDARY FUNCTIONS

// ######################################## PRIMARY FUNCTIONS

function google_maps_distance(req, res) {

    let venue = '';
    let city = '';
    let province = '';
    if (!req.body.venue) {
        req.result.errors.push({
            error_type: 'Required field',
            field: 'venue',
            message: 'venue is a required field'
        });
    } else {
        venue = req.body.venue;
    }
    if (!req.body.city) {
        req.result.errors.push({
            error_type: 'Required field',
            field: 'city',
            message: 'city is a required field'
        });
    } else {
        city = req.body.city;
    }
    if (!req.body.province) {
        req.result.errors.push({
            error_type: 'Required field',
            field: 'province',
            message: 'province is a required field'
        });
    } else {
        province = req.body.province;
    }

    if (req.result.errors.length > 0) {
        console.warn(req.result.errors);
        req.result.http_code = 400;
        req.result.message = 'Validation failed';
        console.log('<### Validation failed');
        return res.status(req.result.http_code).send(res.result);
    }

    let request_object = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins`+
        `=${process.env.ORIGIN_CITY},${process.env.ORIGIN_PROVINCE},${process.env.ORIGIN_COUNTRY}`+
        `&destinations=${venue},${city},${province},${process.env.ORIGIN_COUNTRY}&`+
        `key=${process.env.GOOGLE_MAPS_API_KEY}`,
    };

    axios(request_object)
            .then(response => {
                req.result.message = 'Google maps data fetched successfully';
                req.result.data = response.data;
                console.log(`<### ${req.result.message}`);
                res.send(req.result);
            })
            .catch(err => {
                console.warn('Error: GOOGLE MAPS: ', err);
                req.result.message = 'Unable to fetch data from Google maps';
                req.result.errors.push(err);
                console.log(`<### ${req.result.message}: ${err.message}`);
                res.status(400).send(err);
            });
}

// ######################################## EXPORTED FUNCTIONS
module.exports = {
    google_maps_distance
};

