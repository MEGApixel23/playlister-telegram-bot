"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
class MessageLogger {
    save(msg) {
        return dynamoDb.put({
            TableName: 'playlister.messages',
            Item: {
                'userId.env': `${msg.from.id}.dev`,
                datetime: new Date().toISOString(),
                user: msg.from,
                text: msg.text,
            }
        }).promise();
    }
}
exports.default = MessageLogger;
//# sourceMappingURL=MessageLogger.js.map