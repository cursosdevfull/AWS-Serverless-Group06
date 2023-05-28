import { formatJSONResponse } from "@libs/api-gateway";

const end = async (event) => {
  console.log("end", event);
  return formatJSONResponse({
    message: `Hello, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = end;
