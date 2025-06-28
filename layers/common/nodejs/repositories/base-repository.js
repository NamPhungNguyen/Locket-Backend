class BaseRepository {
  /**
   * DynamoUtil
   * @type {import('../utils/dynamodb-util')}
   */
  dynamoUtil;

  /**
   * Table name corresponding to repository
   * @type {string}
   */
  tableName;

  /**
   * Partition key of table
   * @type {string}
   */
  partitionKey;

  /**
   * Sort key of table
   * @type {string}
   */
  sortKey;

  constructor(dynamoUtil) {
    /**
     * DynamoUtil
     * @type {import('../utils/dynamodb-util')}
     */
    this.dynamoUtil = dynamoUtil;
  }

  async getItemByKey(partitionValue, sortValue = null) {
    const key = {
      [this.partitionKey]: partitionValue,
    };
    if (this.sortKey && sortValue) {
      key[this.sortKey] = sortValue;
    }

    const data = await this.dynamoUtil.getItem({
      TableName: this.tableName,
      Key: key,
    });

    return data?.Item;
  }

  async putItemToDB(data) {
    const result = await this.dynamoUtil.putItem({
      TableName: this.tableName,
      Item: {
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    });

    return result?.Attributes;
  }

  async updateItemToDB(partitionValue, sortValue = null, updates = {}) {
    const key = {
      [this.partitionKey]: partitionValue,
    };
    if (this.sortKey && sortValue) {
      key[this.sortKey] = sortValue;
    }

    const updateExpressions = [];
    const ExpressionAttributeValues = {};
    const ExpressionAttributeNames = {};

    for (const [attr, value] of Object.entries(updates)) {
      if (value !== undefined) {
        updateExpressions.push(`#${attr} = :${attr}`);
        ExpressionAttributeValues[`:${attr}`] = value;
        ExpressionAttributeNames[`#${attr}`] = attr;
      }
    }

    updateExpressions.push("updated_at = :updated_at");
    ExpressionAttributeValues[":updated_at"] = new Date().toISOString();

    const result = await this.dynamoUtil.updateItem({
      TableName: this.tableName,
      Key: key,
      UpdateExpression: `SET ${updateExpressions.join(", ")}`,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      ReturnValues: "ALL_NEW",
    });

    return result?.Attributes;
  }

  async deleteItemByKey(partitionValue, sortValue = null) {
    const key = {
      [this.partitionKey]: partitionValue,
    };
    if (this.sortKey && sortValue) {
      key[this.sortKey] = sortValue;
    }

    await this.dynamoUtil.deleteItem({
      TableName: this.tableName,
      Key: key,
    });
  }
}

module.exports = BaseRepository;
