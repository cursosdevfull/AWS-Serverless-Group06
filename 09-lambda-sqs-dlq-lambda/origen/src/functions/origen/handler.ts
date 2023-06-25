import * as AWS from "aws-sdk";

const sqs = new AWS.SQS();

interface SendMessageSQS {
  MessageBody: string;
  QueueUrl: string;
}

const origen = async (event) => {
  const body = event.body;

  const params: SendMessageSQS = {
    MessageBody: body,
    QueueUrl: process.env.SQS_QUEUE_URL,
  };

  console.log("params", params);
  const result = await sqs.sendMessage(params).promise();
  console.log("result", result);

  return {
    statusCode: 200,
    body: "Message send",
  };

  return {
    statusCode: 200,
    body: "Hola mundo",
  };
};

export const main = origen;
