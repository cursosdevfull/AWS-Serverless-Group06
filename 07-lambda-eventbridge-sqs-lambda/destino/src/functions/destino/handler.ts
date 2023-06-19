const destino = async (event) => {
  console.log("event", JSON.stringify(event, null, "\t"));
  return {
    statusCode: 200,
    body: "Hola mundo",
  };
};

export const main = destino;
