import create from "@functions/origin/presentation";

import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "appointment",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    stage: "${opt:stage, 'dev'}",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      TOPIC_PE_ARN: "${ssm:/${self:provider.stage}/sns/TOPICPE}",
      TOPIC_CO_ARN: "${ssm:/${self:provider.stage}/sns/TOPICCO}",
      TOPIC_MX_ARN: "${ssm:/${self:provider.stage}/sns/TOPICMX}",
      TOPIC_PE_NAME: "SNSTOPICPE-${self:provider.stage}",
      TOPIC_CO_NAME: "SNSTOPICCO-${self:provider.stage}",
      TOPIC_MX_NAME: "SNSTOPICMX-${self:provider.stage}",
    },
    role: "arn:aws:iam::282865065290:role/role_${self:provider.stage}",
  },
  // import the function via paths
  functions: { create },
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
};

module.exports = serverlessConfiguration;
