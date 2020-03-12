import * as AWS from "aws-sdk";
import express from "express";
import * as companiesModel from "../models/companiesModel";
import * as categoriesModel from "../models/categoriesModel";
import { v1 as uuidv1 } from "uuid";

export async function get(
  dynamoDBDocumentClient: AWS.DynamoDB.DocumentClient, req: express.Request): Promise<companiesModel.ICompany | companiesModel.ICompany[] | undefined> {

  if (req.params.hasOwnProperty("id")) {
    return companiesModel.get(dynamoDBDocumentClient, req.params.id);
  }

  return companiesModel.list(dynamoDBDocumentClient, req.query.categoryId)
}

export async function put(
  dynamoDBDocumentClient: AWS.DynamoDB.DocumentClient, req: express.Request): Promise<companiesModel.ICompany> {
  const Item = { ...req.body }
  if (!Item.hasOwnProperty("id")) {
    Item.id = uuidv1();
  }
  return companiesModel.put(dynamoDBDocumentClient, Item);
}

export async function associateCategory(
  dynamoDBDocumentClient: AWS.DynamoDB.DocumentClient, req: express.Request): Promise<companiesModel.ICompany> {
  const companyId = req.params.id;
  const categoryId = req.params.categoryId;

  const company = await companiesModel.get(dynamoDBDocumentClient, companyId);
  if (!company) {
    throw new Error("Company related to companyId not available.")
  }

  const category = await categoriesModel.get(dynamoDBDocumentClient, categoryId);
  if (!category) {
    throw new Error("Category related to categoryId not available.")
  }

  const categories = typeof company.categories === "undefined" ?
    [{ id: categoryId }] :
    [...company.categories, { id: categoryId }];

  const updatedCompany = {
    ...company,
    categories,
  }

  return companiesModel.put(dynamoDBDocumentClient, updatedCompany);
}