import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sns: {
        arn: "arn:aws:sns:us-east-1:282865065290:origen-topic",
        topicName: "origen-topic",
      },
    },
  ],
};
