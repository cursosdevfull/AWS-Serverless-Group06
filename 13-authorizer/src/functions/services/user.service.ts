import * as AWS from "aws-sdk";

import { TokenService } from "./token.service";

const dynamoDb = new AWS.DynamoDB.DocumentClient();
export class UserService {
  static async getUser(email: string): Promise<any> {
    const params = {
      TableName: "users",
      Key: { email },
    };

    const result = await dynamoDb.get(params).promise();
    return result.Item;
  }

  static async register(
    name: string,
    email: string,
    password: string
  ): Promise<any> {
    const record = {
      name,
      email,
      password,
      refreshToken: TokenService.createRefreshToken(),
      createdAt: new Date().toISOString(),
    };

    const params = {
      TableName: "users",
      Item: record,
    };

    await dynamoDb.put(params).promise();
  }
}
