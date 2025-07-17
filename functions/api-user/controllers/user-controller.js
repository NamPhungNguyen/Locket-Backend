const userService = require('../services/user-service');

const getUserById = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getUserById
}