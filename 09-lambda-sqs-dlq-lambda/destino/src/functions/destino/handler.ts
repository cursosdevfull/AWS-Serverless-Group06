const destino = async (event) => {
  //try {
  /*
      Acá va las operaciones para guardar en la base de datos.
      Si falla se ejecuta el catch y se envía a la cola de DLQ
    */
  /*return {
    statusCode: 200,
    body: "Hola mundo",
  };*/
  /*} catch (error) {
    const err = new Error(error.message);
    throw err;
  }*/
  throw new Error("Error processing message");
};

export const main = destino;
