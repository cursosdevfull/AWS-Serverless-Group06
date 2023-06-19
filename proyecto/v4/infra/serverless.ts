import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "infra",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    stage: "${opt:stage, 'dev'}",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  functions: {},
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      SQSPE: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "SQSPEV3-${self:provider.stage}",
        },
      },
      SQSCO: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "SQSCOV3-${self:provider.stage}",
        },
      },
      SQSMX: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "SQSMXV3-${self:provider.stage}",
        },
      },
      SSMSQSPE: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/${self:provider.stage}/sqs/SQSPE",
          Type: "String",
          Value: { "Fn::GetAtt": ["SQSPE", "Arn"] },
        },
      },
      SSMSQSCO: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/${self:provider.stage}/sqs/SQSCO",
          Type: "String",
          Value: { "Fn::GetAtt": ["SQSCO", "Arn"] },
        },
      },
      SSMSQSMX: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/${self:provider.stage}/sqs/SQSMX",
          Type: "String",
          Value: { "Fn::GetAtt": ["SQSMX", "Arn"] },
        },
      },
      EventBusProjectCurso06: {
        Type: "AWS::Events::EventBus",
        Properties: {
          Name: "EventBusProjectCurso06-${self:provider.stage}",
        },
      },
      EventRulePE: {
        Type: "AWS::Events::Rule",
        Properties: {
          EventBusName: { "Fn::GetAtt": ["EventBusProjectCurso06", "Name"] },
          EventPattern: {
            source: ["appointment"],
            "detail-type": ["appointment-registered-pe"],
          },
          Targets: [
            {
              Arn: { "Fn::GetAtt": ["SQSPE", "Arn"] },
              Id: "SQSPE",
            },
          ],
        },
      },
      EventRuleCO: {
        Type: "AWS::Events::Rule",
        Properties: {
          EventBusName: { "Fn::GetAtt": ["EventBusProjectCurso06", "Name"] },
          EventPattern: {
            source: ["appointment"],
            "detail-type": ["appointment-registered-co"],
          },
          Targets: [
            {
              Arn: { "Fn::GetAtt": ["SQSCO", "Arn"] },
              Id: "SQSCO",
            },
          ],
        },
      },
      EventRuleMX: {
        Type: "AWS::Events::Rule",
        Properties: {
          EventBusName: { "Fn::GetAtt": ["EventBusProjectCurso06", "Name"] },
          EventPattern: {
            source: ["appointment"],
            "detail-type": ["appointment-registered-mx"],
          },
          Targets: [
            {
              Arn: { "Fn::GetAtt": ["SQSMX", "Arn"] },
              Id: "SQSMX",
            },
          ],
        },
      },
      EventBridgeSQSPermission: {
        Type: "AWS::SQS::QueuePolicy",
        Properties: {
          PolicyDocument: {
            Statement: [
              {
                Effect: "Allow",
                Action: "sqs:SendMessage",
                Resource: [
                  { "Fn::GetAtt": ["SQSPE", "Arn"] },
                  { "Fn::GetAtt": ["SQSCO", "Arn"] },
                  { "Fn::GetAtt": ["SQSMX", "Arn"] },
                ],
                Principal: { Service: "events.amazonaws.com" },
              },
            ],
          },
          Queues: [{ Ref: "SQSPE" }, { Ref: "SQSCO" }, { Ref: "SQSMX" }],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
