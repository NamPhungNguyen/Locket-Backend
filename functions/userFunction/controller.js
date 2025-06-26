const dynamoDb = require('../utils/dynamoClient');
const { v4: uuidv4 } = require('uuid');

const TABLE_NAME = process.env.USER_TABLE || 'UserTable';

exports.getUsers = async (req, res) => {
    const params = {
        TableName: TABLE_NAME,
    };

    try {
        const data = await dynamoDb.scan(params).promise();
        res.json(data.Items);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

exports.createUser = async (req, res) => {
    const { name, email } = req.body;
    const newUser = {
        user_id: uuidv4(),
        name,
        email,
    };

    const params = {
        TableName: TABLE_NAME,
        Item: newUser,
    };

    try {
        await dynamoDb.put(params).promise();
        res.status(201).json({ message: `User ${name} created.`, user: newUser });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Failed to create user' });
    }
};
