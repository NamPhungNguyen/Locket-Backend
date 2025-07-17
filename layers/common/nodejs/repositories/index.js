const DynamoDBUtil = require('../utils/dynamodb-util');
const UserRepository = require('./user-repository');

const dynamodbUtil = new DynamoDBUtil();

const userRepository = new UserRepository(dynamodbUtil);

module.exports = {
    userRepository,
}