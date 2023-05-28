const testHandler = async (event: any = {}): Promise<any> => {
  console.log("event", event);

  return {
    statusCode: 200,
    body: "Hola desde el handler de test",
  };
};

export { testHandler };
