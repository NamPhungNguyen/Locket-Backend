class BaseRepository {
    constructor(dynamoUtil, tableName, partitionKey, sortKey = null) {
        this.dynamoUtil = dynamoUtil;
        this.tableName = tableName;
        this.partitionKey = partitionKey;
        this.sortKey = sortKey;
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
        const currentTime = getCurrentTimeToISO();

        const result = await this.dynamoUtil.putItem({
            TableName: this.tableName,
            Item: {
                ...data,
                created_at: currentTime,
                updated_at: currentTime,
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

        const now = getCurrentTimeToISO();
        updateExpressions.push('updated_at = :updated_at');
        ExpressionAttributeValues[':updated_at'] = now;

        const result = await this.dynamoUtil.updateItem({
            TableName: this.tableName,
            Key: key,
            UpdateExpression: `SET ${updateExpressions.join(', ')}`,
            ExpressionAttributeNames,
            ExpressionAttributeValues,
            ReturnValues: 'ALL_NEW',
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
