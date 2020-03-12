import * as AWS from "aws-sdk";
import * as express from "express";
import { v1 as uuidv1 } from "uuid";

export interface ICategoryInput {
  name: string;
}

export interface ICategory extends ICategoryInput, AWS.DynamoDB.DocumentClient.AttributeMap {
  id: string;
}

const TableName = "categories";

export async function get(
  dynamoDBDocumentClient: AWS.DynamoDB.DocumentClient, req: express.Request): Promise<ICategory[] | undefined> {
  return new Promise((
    resolve: (categories: ICategory[] | undefined) => void, reject) => {
    let params = {
      TableName
    };
    let method: "scan" | "query" = "scan";

    if (req?.params.hasOwnProperty("id")) {
      method ="query";
      params = {
        ...params,
        ...{
          ExpressionAttributeValues: {
            ":id": req.params.id,
          },
          KeyConditionExpression: "id = :id",
        },
      }
    }

    dynamoDBDocumentClient[method](params, (error, data) => {
      if (error) {
        reject(error);
      }

      resolve(data.Items as ICategory[] | undefined);
    });
  });
}

// export async function post(
//   dynamoDBDocumentClient: AWS.DynamoDB.DocumentClient, req: express.Request)
//   : Promise<ICompany> {
//   return new Promise((
//     resolve: (companies: ICompany) => void, reject) => {
//     const params = {
//       Item: {
//         id: uuidv1(),
//         ...req.body,
//       },
//       TableName,
//     };

//     dynamoDBDocumentClient.put(params, (error, data) => {
//       if (error) {
//         reject(error);
//       }

//       resolve(data.Attributes as ICompany);
//     });
//   });
// }

export async function put(
  dynamoDBDocumentClient: AWS.DynamoDB.DocumentClient, req: express.Request)
  : Promise<ICategory> {
  return new Promise((
    resolve: (categories: ICategory) => void, reject) => {
    const Item = { ...req.body }
    if (!Item.hasOwnProperty("id")) {
      Item.id = uuidv1();
    }

    const params = {
      Item,
      TableName,
    };

    dynamoDBDocumentClient.put(params, (error, data) => {
      if (error) {
        reject(error);
      }

      resolve(data.Attributes as ICategory);
    });
  });
}