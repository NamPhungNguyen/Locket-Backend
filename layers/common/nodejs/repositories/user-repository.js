const { UserTable } = require("../variables/env");
const BaseRepository = require("./base-repository");
const { v4: uuidv4 } = require('uuid');

class UserRepository extends BaseRepository {
  constructor(dynamoUtil) {
    super(dynamoUtil);
    this.tableName = UserTable;
    this.partitionKey = "user_id";
  }

  async getUserByKey(userId) {
    const userData = await this.getItemByKey(userId);
    return userData;
  }

  async createUser(user) {
    if (!user) {
      throw new Error("User data is invalid");
    }

    // Nếu chưa có user_id thì tự sinh
    if (!user.user_id) {
      user.user_id = uuidv4();
      console.log("Generated user_id:", user.user_id);
    }

    const result = await this.putItemToDB(user);
    if (!result) {
      throw new Error("Failed to create user");
    }
    return result;
  }
}

module.exports = UserRepository;
