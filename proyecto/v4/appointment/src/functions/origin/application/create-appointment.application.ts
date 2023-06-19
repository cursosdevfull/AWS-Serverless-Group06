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
    const source = "appointment";
    const detailType = `appointment-registered-${params.countryIso.toLowerCase()}`;
    const eventBusName = process.env["EVENT_BUS_NAME"];

    console.log("source", source);
    console.log("detailType", detailType);
    console.log("eventBusName", eventBusName);
    const result = await this.infrastructure.redirect(
      source,
      detailType,
      eventBusName,
      params
    );

    console.log("result", result);

    if (result.isErr()) {
      console.log("error returned", result.error);
      return result.error;
    } else {
      return null;
    }
  }
}
