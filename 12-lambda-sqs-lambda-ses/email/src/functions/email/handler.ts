import * as AWS from "aws-sdk";
import * as velocityjs from "velocityjs";

const S3 = new AWS.S3();
const SES = new AWS.SES();

interface ITemplate {
  bucketName: string;
  key: string;
}

const readFile = async (template: ITemplate) => {
  const { bucketName, key } = template;
  const params = { Bucket: bucketName, Key: key };

  const data = await S3.getObject(params).promise();
  return data.Body.toString("utf-8");
};

const replaceAttributes = (
  templateContent: string,
  data: Record<string, any>
) => {
  return velocityjs.render(templateContent, data);
};

const sentEmail = async (
  source: string,
  addresses: any[],
  subject: string,
  body: string
) => {
  const params: AWS.SES.SendEmailRequest = {
    Source: source,
    Destination: {
      ToAddresses: addresses,
    },
    Message: {
      Body: {
        Html: {
          Data: body,
        },
      },
      Subject: {
        Data: subject,
      },
    },
  };

  const result = await SES.sendEmail(params).promise();
  console.log(result);
};

const email = async (event) => {
  const { Records } = event;

  for (const record of Records) {
    const body = JSON.parse(record.body);

    const source = "sergiohidalgocaceres@gmail.com";
    const addresses = [body.email];
    const subject = "Welcome to Cursos Dev";
    const templateContent = await readFile({
      bucketName: body.bucket,
      key: body.key,
    });
    const content = replaceAttributes(templateContent, { name: body.name });
    console.log(content);

    await sentEmail(source, addresses, subject, content);
  }
};

export const main = email;
