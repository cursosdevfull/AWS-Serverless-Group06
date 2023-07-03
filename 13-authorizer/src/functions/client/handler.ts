const client = async (event) => {
  const listClients = [
    { id: 1, name: "Client 1" },
    { id: 2, name: "Client 2" },
    { id: 3, name: "Client 3" },
  ];

  return {
    statusCode: 200,
    body: JSON.stringify(listClients),
  };
};

export const main = client;
