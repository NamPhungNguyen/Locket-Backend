const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand,
  BatchGetCommand,
  TransactWriteCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

class DynamoDBUtil {
  static instance = null;

  constructor() {
    if (DynamoDBUtil.instance) {
      return DynamoDBUtil.instance;
    }
    const dynamodbClient = new DynamoDBClient();
    this.docClient = DynamoDBDocumentClient.from(dynamodbClient);
    DynamoDBUtil.instance = this;
  }

  async getItem(params) {
    return await this.docClient.send(new GetCommand(params));
  }

  async putItem(params) {
    return await this.docClient.send(new PutCommand(params));
  }

  async updateItem(params) {
    return await this.docClient.send(new UpdateCommand(params));
  }

  async deleteItem(params) {
    return await this.docClient.send(new DeleteCommand(params));
  }

  async queryItems(params) {
    return await this.docClient.send(new QueryCommand(params));
  }

  async queryAllItems(params) {
    let items = [];
    let lastEvaluatedKey = undefined;

    do {
      const result = await this.docClient.send(
        new QueryCommand({
          ...params,
          ExclusiveStartKey: lastEvaluatedKey,
        })
      );
      items = items.concat(result.Items || []);
      lastEvaluatedKey = result.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    return items;
  }

  async batchGetAllItem(params) {
    const result = await this.docClient.send(new BatchGetCommand(params));
    return result.Responses;
  }

  async transactWriteMultipleItems(params) {
    return await this.docClient.send(new TransactWriteCommand(params));
  }

  async scanItems(params) {
    let items = [];
    let lastEvaluatedKey = undefined;

    do {
      const result = await this.docClient.send(
        new ScanCommand({
          ...params,
          ExclusiveStartKey: lastEvaluatedKey,
        })
      );
      items = items.concat(result.Items || []);
      lastEvaluatedKey = result.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    return items;
  }
}

module.exports = DynamoDBUtil;
