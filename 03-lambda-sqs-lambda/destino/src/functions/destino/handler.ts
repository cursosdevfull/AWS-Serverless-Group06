const destino = async (event) => {
  console.log("event", event);
  return {
    statusCode: 200,
    body: "Hola mundo",
  };
};

export const main = destino;
