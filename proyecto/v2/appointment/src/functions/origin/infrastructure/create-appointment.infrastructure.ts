import { IError } from "@libs/cursos-dev/Error";
import * as AWS from "aws-sdk";
import { err, ok, Result } from "neverthrow";

const sqs = new AWS.SQS();

export type OperationResult = Result<boolean, IError>;
export interface SendMessageSQS {
  MessageBody: string;
  QueueUrl: string;
}

export class CreateAppointmentInfrastructure {
  async redirect(sqsUrl: string, params: any): Promise<OperationResult> {
    console.log("send message", {
      MessageBody: JSON.stringify(params),
      QueueUrl: sqsUrl,
    });
    try {
      const message: SendMessageSQS = {
        MessageBody: JSON.stringify(params),
        QueueUrl: sqsUrl,
      };
      await sqs.sendMessage(message).promise();
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
