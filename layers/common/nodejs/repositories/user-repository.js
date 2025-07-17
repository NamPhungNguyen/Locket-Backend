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
}

module.exports = UserRepository;
