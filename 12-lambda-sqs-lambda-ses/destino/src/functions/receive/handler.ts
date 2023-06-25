const receive = async (event) => {
  console.log("event", event);
  return {
    statusCode: 200,
    body: "hoa",
  };
};

export const main = receive;
