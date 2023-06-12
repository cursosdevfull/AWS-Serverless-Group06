import { Responses } from "@libs/cursos-dev/Responses";

import { Validation } from "../../../libs/cursos-dev/Validation";
import { CreateAppointmentApplication } from "../application/create-appointment.application";
import { CreateAppointmentInfrastructure } from "../infrastructure/create-appointment.infrastructure";
import { CreateAppointmentDto } from "./dtos/create-appointment.dto";

const create = async (event) => {
  const { queryStringParameters, pathParameters, body, headers } = event;

  const { doctor, clinica } = queryStringParameters;
  const { countryIso } = pathParameters;
  const { origin, destination } = headers;
  const { date, specialtyId } = JSON.parse(body);

  const params = {
    doctor,
    clinica,
    countryIso,
    origin,
    destination,
    date,
    specialtyId,
  };

  /*const dtoToValidate = new CreateAppointmentDto();
  dtoToValidate.doctor = params.doctor;
  dtoToValidate.clinica = params.clinica;
  dtoToValidate.countryIso = params.countryIso;
  dtoToValidate.origin = params.origin;
  dtoToValidate.destination = params.destination;
  dtoToValidate.date = params.date;
  dtoToValidate.specialtyId = params.specialtyId;*/

  const dtoToValidate = Object.assign(new CreateAppointmentDto(), params);
  const errors = await Validation.parameters(dtoToValidate, params);

  if (errors) return Responses.errorsInputs(errors);

  const infrastructure = new CreateAppointmentInfrastructure();
  const application = new CreateAppointmentApplication(infrastructure);

  const result = await application.redirect(params);

  return result ? Responses.errorsServer(result) : Responses.success(params);

  /* console.log("queryStringParameters", queryStringParameters);
  console.log("pathParameters", pathParameters);
  console.log("body", JSON.parse(body));
  console.log("headers", headers);*/
};

export const main = create;
