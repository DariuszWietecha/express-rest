import * as AWS from "aws-sdk";
import * as express from "express";
import { v1 as uuidv1 } from "uuid";

export interface ICompanyInput {
  name: string;
  logoUrl: string;
  email: string;
  categories: [{ id: string; }];
}

export interface ICompany extends ICompanyInput, AWS.DynamoDB.DocumentClient.AttributeMap {
  id: string;
}

export interface ICompanyCategory {
  id: string;
  name: string;
}

export interface ICompanyRequest extends express.Request {
  categoryId?: string;
}

const TableName = "companies";

export async function get(
  dynamoDBDocumentClient: AWS.DynamoDB.DocumentClient, req: ICompanyRequest): Promise<ICompany[] | undefined> {
  return new Promise((
    resolve: (companies: ICompany[] | undefined) => void, reject) => {
    let params = {
      TableName
    };

    if (req?.query.hasOwnProperty("categoryId")) {
      params = {
        ...params,
        ...{
          ExpressionAttributeValues: {
            ":searchedCategory": {
              "id": req.query.categoryId,
            }
          },
          ExpressionAttributeNames: {
            "#categories": "categories"
          },
          FilterExpression: "contains (#categories, :searchedCategory)",
        },
      }
    }

    dynamoDBDocumentClient.scan(params, (error, data) => {
      if (error) {
        reject(error);
      }

      resolve(data.Items as ICompany[] | undefined);
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
  : Promise<ICompany> {
  return new Promise((
    resolve: (companies: ICompany) => void, reject) => {
      const Item = {...req.body}
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

      resolve(data.Attributes as ICompany);
    });
  });
}