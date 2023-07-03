import * as AWS from "aws-sdk";

const sqs = new AWS.SQS();
interface SendMessageSQS {
  MessageBody: string;
  QueueUrl: string;
}
const receive = async (event) => {
  const listPromise = [];

  event.Records.forEach((record) => {
    const body = record.body;

    const params: SendMessageSQS = {
      MessageBody: body,
      QueueUrl: process.env.SQS_QUEUE_URL,
    };

    listPromise.push(sqs.sendMessage(params).promise());
  });

  await Promise.all(listPromise);

  return {
    statusCode: 200,
    body: "hoa",
  };
};

export const main = receive;
