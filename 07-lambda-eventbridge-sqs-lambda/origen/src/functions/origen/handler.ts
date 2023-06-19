import * as AWS from "aws-sdk";

const eb = new AWS.EventBridge();

interface SendMessageEventBridge {
  Entries: [
    {
      Source: string;
      Detail: string;
      DetailType: string;
      EventBusName: string;
    }
  ];
}
const origen = async (event) => {
  const body = event.body;
  console.log("body", body);

  const params: SendMessageEventBridge = {
    Entries: [
      {
        Source: "appointment",
        Detail: JSON.stringify({ message: body }),
        DetailType: "appointment-registered",
        EventBusName: "EBusSQS",
      },
    ],
  };

  console.log("params", params);
  const result = await eb.putEvents(params).promise();
  console.log("result", result);

  return {
    statusCode: 200,
    body: "Message send",
  };
};

export const main = origen;
