import { CreateAppointmentInfrastructure } from "../infrastructure/create-appointment.infrastructure";
import { CreateAppointmentDto } from "../presentation/dtos/create-appointment.dto";

const lambdaFunctionNameByCountry = {
  PE: "appointment-pe-dev-create",
  CO: "appointment-co-dev-create",
  MX: "appointment-mx-dev-create",
};

export class CreateAppointmentApplication {
  constructor(
    private readonly infrastructure: CreateAppointmentInfrastructure
  ) {}

  async redirect(params: CreateAppointmentDto) {
    const topicArn =
      process.env[`TOPIC_${params.countryIso.toUpperCase()}_ARN`];

    console.log("topicArn", topicArn);
    console.log("params", params);
    const result = await this.infrastructure.redirect(topicArn, params);

    console.log("result", result);

    if (result.isErr()) {
      console.log("error returned", result.error);
      return result.error;
    } else {
      return null;
    }
  }
}
