import { CreateAppointmentInfrastructure } from "../infrastructure/create-appointment.infrastructure";
import { CreateAppointmentDto } from "../presentation/dtos/create-appointment.dto";

const lambdaFunctionNameByCountry = {
  PE: "appointment-pe-dev-create",
  CO: "appointment-co-dev-create",
  MX: "appointment-mx-dev-create",
};

export class CreateAppointmentApplication {
  /*private readonly infrastructure: CreateAppointmentInfrastructure

  constructor(infrastructure: CreateAppointmentInfrastructure){
    this.infrastructure = infrastructure;
  }*/

  constructor(
    private readonly infrastructure: CreateAppointmentInfrastructure
  ) {}

  async redirect(params: CreateAppointmentDto) {
    const sqsUrl = process.env[`SQS_${params.countryIso.toUpperCase()}_URL`];

    console.log("sqsUrl", sqsUrl);
    console.log("params", params);
    const result = await this.infrastructure.redirect(sqsUrl, params);

    console.log("result", result);

    if (result.isErr()) {
      console.log("error returned", result.error);
      return result.error;
    } else {
      return null;
    }
  }
}
