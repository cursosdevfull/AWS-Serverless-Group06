import * as AWS from "aws-sdk";

const s3 = new AWS.S3();
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const receive = async (event) => {
  const { Records } = event;

  const listPromises = [];

  for (const record of Records) {
    const obj = record.s3;
    const bucket = obj.bucket.name;
    const key = obj.object.key;

    console.log(`Reading from bucket ${bucket} and key ${key}`);

    const data = await s3.getObject({ Bucket: bucket, Key: key }).promise();
    const body = data.Body.toString("utf-8");

    const lines = body.split("\n");
    for (const line of lines) {
      const [id, name, email] = line.split(",");

      const promise = new Promise(async () => {
        const recordToInsert = {
          id,
          name,
          email,
          date: new Date().toISOString(),
        };

        const params = {
          TableName: "patients",
          Item: recordToInsert,
        };

        await dynamoDb.put(params).promise();
      });

      listPromises.push(promise);
      console.log(`id: ${id}, name: ${name}, email: ${email}`);
    }
  }
  await Promise.all(listPromises);

  return {
    statusCode: 200,
    body: "ok",
  };
};

export const main = receive;
