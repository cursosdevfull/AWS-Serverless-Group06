const destino = async (event) => {
  console.log("event", event);
  console.log("Records", event.detail.message);
  return {
    statusCode: 200,
    body: "Hola mundo",
  };
};

export const main = destino;
