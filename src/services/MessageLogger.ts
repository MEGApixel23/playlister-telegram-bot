import { DynamoDB } from 'aws-sdk';
import * as TelegramBot from 'node-telegram-bot-api';

const dynamoDb = new DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export default class MessageLogger {
  public save (msg: TelegramBot.Message) {
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
