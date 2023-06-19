import { IError } from "@libs/cursos-dev/Error";
import * as AWS from "aws-sdk";
import { err, ok, Result } from "neverthrow";

const eb = new AWS.EventBridge();

export type OperationResult = Result<boolean, IError>;
export interface SendMessageEventBridge {
  Entries: [
    {
      Source: string;
      Detail: string;
      DetailType: string;
      EventBusName: string;
    }
  ];
}

export class CreateAppointmentInfrastructure {
  async redirect(
    source: string,
    detailType: string,
    eventBusName: string,
    params: any
  ): Promise<OperationResult> {
    console.log("send message", {
      Entries: [
        {
          Source: source,
          Detail: JSON.stringify(params),
          DetailType: detailType,
          EventBusName: eventBusName,
        },
      ],
    });
    try {
      const message: SendMessageEventBridge = {
        Entries: [
          {
            Source: source,
            Detail: JSON.stringify(params),
            DetailType: detailType,
            EventBusName: eventBusName,
          },
        ],
      };
      await eb.putEvents(message).promise();
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
