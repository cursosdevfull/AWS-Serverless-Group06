const job = async (event) => {
  console.log(event);
  return {
    statusCode: 200,
    body: "hola mundo",
  };
};

export const main = job;
