import * as AWS from "aws-sdk";
import express from "express";
import * as categoriesModel from "../models/categoriesModel";
import { v1 as uuidv1 } from "uuid";

export async function get(
  dynamoDBDocumentClient: AWS.DynamoDB.DocumentClient, req: express.Request): Promise<categoriesModel.ICategory | categoriesModel.ICategory[] | undefined> {
  if (req.params.hasOwnProperty("id")) {
    return categoriesModel.get(dynamoDBDocumentClient, req.params.id);
  }
  return categoriesModel.list(dynamoDBDocumentClient, req.query.categoryId)
}

export async function put(
  dynamoDBDocumentClient: AWS.DynamoDB.DocumentClient, req: express.Request): Promise<categoriesModel.ICategory> {
  const Item = { ...req.body }
  if (!Item.hasOwnProperty("id")) {
    Item.id = uuidv1();
  }
  return categoriesModel.put(dynamoDBDocumentClient, Item);
}