import * as AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const sft = new AWS.StepFunctions();

const executeStepFunction = (valueToSend: number) => {
  const stateMachineName = "myStateMachine";

  return sft
    .listStateMachines({})
    .promise()
    .then((list) => {
      const count = list.stateMachines?.length || 0;

      for (let i = 0; i < count; i++) {
        const stateMachine = list.stateMachines?.[i];
        if (stateMachine?.name === stateMachineName) {
          const params = {
            stateMachineArn: stateMachine.stateMachineArn || "",
            input: JSON.stringify({ numero: valueToSend }),
            name: uuidv4(),
          };

          return sft
            .startExecution(params)
            .promise()
            .then(() => true);
        }
      }
    });
};

const trigger = async (event) => {
  console.log("event", event);
  const number = event.queryStringParameters?.numero || 0;
  console.log("number received", +number);

  try {
    await executeStepFunction(+number);
    return { body: JSON.stringify({ message: "ok" }) };
  } catch (error) {
    console.log("error", error);
    return `Error: ${error.message}`;
  }

  return {
    statusCode: 200,
    body: "Hola mundo",
  };
};

export const main = trigger;
