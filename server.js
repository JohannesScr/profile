const path = require('path');

const express = require('express');
// local imports
const {setup_environment} = require('./includes/config');
let app = express();

setup_environment();
let PORT = process.env.NODE_SERVER_PORT;

// default html
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', express.static('public'));
// app.get('/', (req, res) => {
//     console.log('GET request sent to /');
//     res.send('Express app running');
// });

app.listen(PORT, () => {
    console.log(`################ ${process.env.ENV_NAME} ################`);
    console.log(`Express app running on port: ${PORT}`);
});