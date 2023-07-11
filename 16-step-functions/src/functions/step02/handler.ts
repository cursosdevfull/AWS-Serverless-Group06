const step02 = async (event) => {
  console.log(event);
  const appointment = {
    ticketNumber: event.numero,
    patientName: "Sergio Hidalgo",
  };
  return appointment;
};

export const main = step02;
