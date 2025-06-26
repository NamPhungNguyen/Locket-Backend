const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'ap-southeast-1',
});

module.exports = dynamoDb;
