import { IError } from "@libs/cursos-dev/Error";
import * as AWS from "aws-sdk";
import { err, ok, Result } from "neverthrow";

const lambda = new AWS.Lambda();

export type InvokeLambdaResult = Result<boolean, IError>;

export class CreateAppointmentInfrastructure {
  async redirect(
    lambdaFunctionName: string,
    params: any
  ): Promise<InvokeLambdaResult> {
    console.log("invoke", {
      FunctionName: lambdaFunctionName,
      InvocationType: "RequestResponse",
      Payload: JSON.stringify(params),
    });
    try {
      await lambda
        .invoke({
          FunctionName: lambdaFunctionName,
          InvocationType: "RequestResponse",
          Payload: JSON.stringify(params),
        })
        .promise();
      return ok(true);
    } catch (error) {
      console.log("error", error);
      const objErr = new IError();
      objErr.status = error.status ?? 500;
      objErr.message = error.message;
      objErr.name = error.name;
      objErr.stack = error.stack;

      return err(objErr);
    }
  }
}
