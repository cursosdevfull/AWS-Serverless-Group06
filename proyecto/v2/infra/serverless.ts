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
          QueueName: "SQSPEV2-${self:provider.stage}",
        },
      },
      SQSCO: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "SQSCOV2-${self:provider.stage}",
        },
      },
      SQSMX: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "SQSMXV2-${self:provider.stage}",
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
      SSMSQSPEURL: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/${self:provider.stage}/sqs/SQSPE/url",
          Type: "String",
          Value: { Ref: "SQSPE" },
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
      SSMSQSCOURL: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/${self:provider.stage}/sqs/SQSCO/url",
          Type: "String",
          Value: { Ref: "SQSCO" },
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
      SSMSQSMXURL: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/${self:provider.stage}/sqs/SQSMX/url",
          Type: "String",
          Value: { Ref: "SQSMX" },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
