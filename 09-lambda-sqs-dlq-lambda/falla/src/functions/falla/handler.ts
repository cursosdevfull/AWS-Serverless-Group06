import * as AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const falla = async (event) => {
  const records = event.Records;

  const listPromises = [];

  records.map((record) => {
    const promise = new Promise(async () => {
      const body = JSON.parse(record.body);
      const { name, lastname } = body;

      const recordToInsert = {
        id: uuidv4(),
        name,
        lastname,
        date: new Date().toISOString(),
      };

      const params = {
        TableName: "failures",
        Item: recordToInsert,
      };

      console.log("params", params);

      await dynamoDb.put(params).promise();
    });

    listPromises.push(promise);
  });

  await Promise.all(listPromises);

  return {
    statusCode: 200,
    body: "Hola mundo",
  };
};

export const main = falla;
