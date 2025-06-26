const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();
app.use(bodyParser.json()); // Parse JSON bodies in the request
app.use('/users', router); // Mount the user routes under /users

module.exports = app; // Export Express app cho handler dùng
