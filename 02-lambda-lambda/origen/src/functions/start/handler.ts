import { formatJSONResponse } from "@libs/api-gateway";
import * as AWS from "aws-sdk";

const lambda = new AWS.Lambda();

const start = async (event) => {
  const message = {
    action: "update",
    data: {
      id: 10,
      username: "johndoe",
    },
  };

  const result: any = await lambda
    .invoke({
      FunctionName: "destino-dev-end",
      InvocationType: "RequestResponse",
      Payload: JSON.stringify(message),
    })
    .promise();

  console.log(
    "start",
    {
      FunctionName: "destino-dev-end",
      InvocationType: "RequestResponse",
      Payload: JSON.stringify(message),
    },
    result
  );

  return formatJSONResponse({
    message: `Hello, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = start;
