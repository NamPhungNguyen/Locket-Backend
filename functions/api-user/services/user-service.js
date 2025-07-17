const { userRepository } = require('/opt/nodejs/repositories');


const getUserById = async (userId) => {
    try {
        const user = await userRepository.getUserByKey(userId);
        return user;
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        throw new Error('Could not fetch user');
    }
}

module.exports = {
    getUserById
}