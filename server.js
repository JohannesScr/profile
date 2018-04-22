const path = require('path');

const express = require('express');
// local imports
const {setup_environment} = require('./includes/config');
const {log_url} = require('./includes/server.settings');
let app = express();

setup_environment();
let PORT =  process.env.PORT;

// default html
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(log_url);

app.get('/about', (req, res) => {
    res.render('about.hbs');
});

// app.get('/', express.static('public'));
// app.get('/', (req, res) => {
//     console.log('GET request sent to /');
//     res.send('Express app running');
// });

app.listen(PORT, () => {
    console.log(`################ ${process.env.ENV_NAME} ################`);
    console.log(`Express app running on port: ${PORT}`);
});