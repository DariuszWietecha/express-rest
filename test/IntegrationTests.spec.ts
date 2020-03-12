import * as AWS from "aws-sdk";
import { expect } from "chai";
import request from "supertest";
import { DynamoDB as DDB } from "../src/db";

describe("integration tests", () => {
  const req = request("http://localhost:3000");

  function removeTable(
    DynamoDB: AWS.DynamoDB, TableName: string): Promise<void> {
    return new Promise((
      resolve: () => void, reject) => {
      const params = {
        TableName
      };
      DynamoDB.deleteTable(params, (error, data) => {
        if (error) {
          reject(error);
        }

        resolve();
      });
    });
  }
  function createTable(
    DynamoDB: AWS.DynamoDB, TableName: string): Promise<void> {
    return new Promise((
      resolve: () => void, reject) => {
      const params = {
        AttributeDefinitions: [
          {
            AttributeName: "id",
            AttributeType: "S"
          }
        ],
        KeySchema: [
          {
            AttributeName: "id",
            KeyType: "HASH"
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        },
        TableName
      };

      DynamoDB.createTable(params, (error, data) => {
        if (error) {
          reject(error);
        }

        resolve();
      });
    });
  }

  function createTables(
    DynamoDB: AWS.DynamoDB, tables: string[]): Promise<void[]> {
    return Promise.all(tables.map((table) => createTable(DynamoDB, table)));
  }

  function removeTables(
    DynamoDB: AWS.DynamoDB, tables: string[]): Promise<void | void[]> {
    return Promise.all(tables.map((table) => removeTable(DynamoDB, table)))
      // tslint:disable-next-line:no-console
      .catch((error) => console.log("Error during removing tables, ", error));
  }

  before(async () => {
    // await removeTables(DDB, ["companies", "categories"]);
    await createTables(DDB, ["companies", "categories"]);
  });
  after(async () => {
    await removeTables(DDB, ["companies", "categories"]);
  });

  it("success", async () => {
    // confirm that companies list is empty
    let responseData = await req.get("/companies")
      .expect(200)
      .then((res) => res.body);
    // console.log("------------res", respnseData)
    expect(responseData.length).to.be.eq(0);

    // Create new company
    const company1Input = {
      name: "name1",
      email: "email1"
    };
    responseData = await req.post("/companies")
      .send(company1Input)
      .expect(200)
      .then((res) => res.body);

    expect(responseData.name).to.be.eq(company1Input.name);
    expect(responseData.email).to.be.eq(company1Input.email);

    // Update an existing company
    const updatedCompanyInput = {
      ...company1Input,
      id: responseData.id,
      email: "updatedemail1"
    };
    responseData = await req.put("/companies")
      .send(updatedCompanyInput)
      .expect(200)
      .then((res) => res.body);

    expect(responseData.email).to.be.eq(updatedCompanyInput.email);

    // Get a list of all companies
    const company2Input = {
      name: "name2",
      email: "email2"
    };
    await req.post("/companies")
      .send(company2Input)
      .expect(200)

    responseData = await req.get("/companies")
      .expect(200)
      .then((res) => res.body);

    expect(responseData.length).to.be.eq(2);

    // Create a new category
    const categoryInput = {
      name: "categoryName1",
    };
    responseData = await req.post("/categories")
      .send(categoryInput)
      .expect(200)
      .then((res) => res.body);

    expect(responseData.name).to.be.eq(categoryInput.name);

    // Update an existing category
    const updatedCategoryInput = {
      id: responseData.id,
      name: "updatedCategoryName1",
    };
    responseData = await req.put("/categories")
      .send(updatedCategoryInput)
      .expect(200)
      .then((res) => res.body);

    expect(responseData.name).to.be.eq(updatedCategoryInput.name);

    // Associate a category to a company
    responseData = await req.put(`/companies/${updatedCompanyInput.id}/associate/${updatedCategoryInput.id}`)
      .expect(200)
      .then((res) => res.body);

    expect(responseData.categories[0].id).to.eq(updatedCategoryInput.id);

    // View
    await req.post("/categories")
      .send({ name: "categoryName2" })
      .expect(200)

    responseData = await req.get("/views")
      .expect(200)
      .then((res) => res.body);

    expect(typeof responseData.categoryId).to.eq("undefined");
    expect(responseData.categories.length).to.eq(2);
    expect(responseData.companies.length).to.eq(2);

    // View, filtered by category
    responseData = await req.get(`/views?categoryId=${updatedCategoryInput.id}`)
      .expect(200)
      .then((res) => res.body);
    console.log("------------res", responseData)
    expect(responseData.categoryId).to.eq(updatedCategoryInput.id);
    expect(responseData.categories.length).to.eq(2);
    expect(responseData.companies.length).to.eq(1);
    expect(responseData.companies[0].id).to.eq(updatedCompanyInput.id);
  }).timeout(100000)
});
