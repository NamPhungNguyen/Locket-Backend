const { UserTable } = require("../variables/env");
const BaseRepository = require("./base-repository");

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
    console.log("Received user:", user);

    if (!user || !user.user_id) {
      throw new Error("User data is invalid or missing user_id");
    }

    const result = await this.putItemToDB(user);
    if (!result) {
      throw new Error("Failed to create user");
    }
    return result;
  }
}

module.exports = UserRepository;
