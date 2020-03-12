import * as AWS from "aws-sdk";
import express from "express";
import * as categoriesModel from "../models/categoriesModel";
import * as companiesModel from "../models/companiesModel";

interface IViewResponse {
  categoryId?: string;
  categories: categoriesModel.ICategory[] | undefined,
  companies:  companiesModel.ICompany[] | undefined,
}

export async function get(
  dynamoDBDocumentClient: AWS.DynamoDB.DocumentClient, req: express.Request): Promise<IViewResponse> {
    const categories = await categoriesModel.list(dynamoDBDocumentClient);
    const companies = await companiesModel.list(dynamoDBDocumentClient, req.query.categoryId);
  return {
    categoryId: req.query.categoryId,
    categories,
    companies,
  }
  // return {
  //   categoryId: req.query.categoryId,
  //   categories,
  //   companies,
  // }
}
