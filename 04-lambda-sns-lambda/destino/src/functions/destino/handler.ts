const destino = async (event) => {
  console.log("event", event);
  console.log("Records", JSON.stringify(event.Records, null, 2));
  return {
    statusCode: 200,
    body: "Hola mundo",
  };
};

export const main = destino;
