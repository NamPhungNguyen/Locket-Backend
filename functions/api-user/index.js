const serverless = require('serverless-http');
const createApp = require('/opt/nodejs/configs/app-config');

const router = require('./routes');

const app = createApp(router);

module.exports.handler = serverless(app);