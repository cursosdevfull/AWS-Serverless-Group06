import * as AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const hello = async (event) => {
  const record = {
    id: uuidv4(),
    nameU: "Sergio",
    lastnameU: "Hidalgo",
    date: new Date().toISOString(),
    countryIso: "PE",
  };

  const params = {
    TableName: "users",
    Item: record,
  };

  console.log("params", params);

  await dynamoDb.put(params).promise();

  const result = await dynamoDb.scan({ TableName: "users" }).promise();
  console.log("result", result);

  const element: any = await dynamoDb
    .get({
      TableName: "users",
      Key: {
        id: "e2f7ab2d-1d7c-498f-b5fc-dcf5a14038b2",
      },
    })
    .promise();

  console.log("element", element);

  const elementUpdated = await dynamoDb
    .update({
      TableName: "users",
      UpdateExpression: "set nameU = :nameU, lastnameU = :lastnameU",
      ExpressionAttributeValues: {
        ":nameU": "Andrea",
        ":lastnameU": "Veliz",
      },
      Key: { id: "d2ea22f9-2b0e-454d-8450-b684afb4515e" },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  console.log("elementUpdated", elementUpdated);

  const elementDeleted = await dynamoDb
    .delete({
      TableName: "users",
      Key: { id: "89fc4bab-7c26-498c-b47f-22a7eaf650f5" },
    })
    .promise();

  console.log("elementDeleted", elementDeleted);

  return {
    statusCode: 200,
    //body: JSON.stringify(result.Items),
    body: JSON.stringify(element.Item),
  };
};

export const main = hello;
