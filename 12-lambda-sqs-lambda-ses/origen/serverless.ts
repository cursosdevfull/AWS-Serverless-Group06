import sender from "@functions/sender";

import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "origen",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      SQS_QUEUE_URL: "${cf:origen-dev.SQSMyQueueURL}",
    },
    iam: {
      role: {
        statements: [
          {
            Action: ["sqs:SendMessage"],
            Effect: "Allow",
            Resource: "arn:aws:sqs:*:*:*",
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { sender },
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
      SQSMyQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "origen03-queue",
        },
      },
    },
    Outputs: {
      SQSMyQueueURL: {
        Value: { Ref: "SQSMyQueue" },
      },
    },
  },
};

module.exports = serverlessConfiguration;
