const { v4: uuidv4 } = require('uuid');

class UserModel {
    /**
     * @param {Object} params
     * @param {string} params.user_id
     * @param {string} params.email
     */
    constructor({ user_id = uuidv4(), email }) {
        this.user_id = user_id;
        this.email = email;
    }
}

module.exports = UserModel;

