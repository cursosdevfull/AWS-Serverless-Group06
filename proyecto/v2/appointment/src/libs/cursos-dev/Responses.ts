import { IError } from "./Error";

export abstract class Responses {
  static errorsInputs(errors: unknown) {
    return {
      statusCode: 411,
      body: JSON.stringify(errors),
    };
  }

  static errorsServer(result: IError) {
    return {
      statusCode: result.status,
      body: JSON.stringify(result),
    };
  }

  static success(result: Record<string, any>) {
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  }
}
