import * as AWS from "aws-sdk";
import express from "express";
import { v1 as uuidv1 } from "uuid";

export interface ICategoryInput {
  name: string;
}

export interface ICategory extends ICategoryInput, AWS.DynamoDB.DocumentClient.AttributeMap {
  id: string;
}

const TableName = "categories";

export async function get(
  dynamoDBDocumentClient: AWS.DynamoDB.DocumentClient, id: string): Promise<ICategory | undefined> {
  return new Promise((
    resolve: (company: ICategory | undefined) => void, reject) => {
    const params = {
      TableName,
      Key: {
        id
      }
    };

    dynamoDBDocumentClient.get(params, (error, data) => {
      if (error) {
        reject(error);
      }

      resolve(data.Item as ICategory | undefined);
    });
  });
}

export async function list(
  dynamoDBDocumentClient: AWS.DynamoDB.DocumentClient, id?: string): Promise<ICategory[] | undefined> {
  return new Promise((
    resolve: (categories: ICategory[] | undefined) => void, reject) => {
    let params = {
      TableName
    };
    let method: "scan" | "query" = "scan";

    if (id) {
      method ="query";
      params = {
        ...params,
        ...{
          ExpressionAttributeValues: {
            ":id": id,
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
  dynamoDBDocumentClient: AWS.DynamoDB.DocumentClient, Item: ICategory)
  : Promise<ICategory> {
  return new Promise((
    resolve: (categories: ICategory) => void, reject) => {
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