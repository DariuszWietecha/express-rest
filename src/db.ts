import * as AWS from "aws-sdk";

if (typeof process.env.DYNAMODB_URL === undefined ||
  typeof process.env.AWS_ACCESS_KEY_ID === undefined ||
  typeof process.env.AWS_REGION === undefined ||
  typeof process.env.AWS_SECRET_ACCESS_KEY === undefined) {
  throw new Error(
    "DYNAMODB_URL, AWS_ACCESS_KEY_ID, AWS_REGION or AWS_SECRET_ACCESS_KEY not available in .env");
}

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const DynamoDBDocumentClient = new AWS.DynamoDB.DocumentClient({ endpoint: process.env.DYNAMODB_URL });
export const DynamoDB = new AWS.DynamoDB({ endpoint: process.env.DYNAMODB_URL });
