const create = async (event) => {
  console.log("event", event);
  return {
    statusCode: 200,
    body: "appointment created",
  };
};

export const main = create;
