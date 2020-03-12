import * as AWS from "aws-sdk";

export interface ICompanyInput {
  name: string;
  logoUrl: string;
  email: string;
  categories: { id: string; }[];
}

export interface ICompany extends ICompanyInput, AWS.DynamoDB.DocumentClient.AttributeMap {
  id?: string;
}

const TableName = "companies";

export async function get(
  dynamoDBDocumentClient: AWS.DynamoDB.DocumentClient, id: string): Promise<ICompany | undefined> {
  return new Promise((
    resolve: (company: ICompany | undefined) => void, reject) => {
    const params = {
      TableName,
      Key: {
        id,
      }
    };

    dynamoDBDocumentClient.get(params, (error, data) => {
      if (error) {
        reject(error);
      }

      resolve(data.Item as ICompany | undefined);
    });
  });
}

export async function list(
  dynamoDBDocumentClient: AWS.DynamoDB.DocumentClient, categoryId?: string): Promise<ICompany[] | undefined> {
  return new Promise((
    resolve: (companies: ICompany[] | undefined) => void, reject) => {
    let params = {
      TableName
    };

    if (categoryId) {
      params = {
        ...params,
        ...{
          ExpressionAttributeValues: {
            ":searchedCategory": {
              "id": categoryId,
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

export async function put(
  dynamoDBDocumentClient: AWS.DynamoDB.DocumentClient, Item: ICompany)
  : Promise<ICompany> {
  return new Promise((
    resolve: (companies: ICompany) => void, reject) => {
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

// export async function associateCategory(dynamoDBDocumentClient: AWS.DynamoDB.DocumentClient, companyId: string, categoryId: string)
//   : Promise<ICompany> {
//   const company = await get()
// }