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

const createUser = async (user) => {
    try {
        const newUser = await userRepository.createUser(user);
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Could not create user');
    }
}

module.exports = {
    getUserById,
    createUser
}