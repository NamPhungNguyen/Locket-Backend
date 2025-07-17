require('dotenv').config();

const express = require('express');
const dayjs = require('dayjs');

const bodyParser = require('body-parser');

const Logger = require('../utils/logger-utils');
const error = require('../middlewares/error');

function createApp(router, options = {}) {
    const app = express();

    // Middleware CORS simple
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*'); // accept all origins
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    // Logging request
    app.use((req, res, next) => {
        Logger.info(`[${dayjs().format()}] ${req.method} ${req.originalUrl}`);
        next();
    });

    // Middleware body-parser
    app.use(bodyParser.urlencoded({ extended: true }));
    if (options?.bodyParserJSON) {
        app.use(bodyParser.json(options.bodyParserJSON));
    } else {
        app.use(bodyParser.json());
    }

    // Gắn router
    app.use('', router);

    // Middleware handle error
    app.use(error.handler);
    return app;
}

module.exports = createApp;
