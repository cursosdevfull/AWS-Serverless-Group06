import { IError } from "@libs/cursos-dev/Error";
import * as AWS from "aws-sdk";
import { err, ok, Result } from "neverthrow";

const sns = new AWS.SNS();

export type OperationResult = Result<boolean, IError>;
export interface SendMessageSNS {
  Message: string;
  TopicArn: string;
}

export class CreateAppointmentInfrastructure {
  async redirect(topicArn: string, params: any): Promise<OperationResult> {
    console.log("send message", {
      Message: JSON.stringify(params),
      TopicArn: topicArn,
    });
    try {
      const message: SendMessageSNS = {
        Message: JSON.stringify(params),
        TopicArn: topicArn,
      };
      await sns.publish(message).promise();
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
