import { expect } from "chai";
import * as db from "../src/db";
import request from "supertest";

describe("integration tests", () => {
  const req = request("http://localhost:3000");

  it("success", async () => {
    // Create new company
    const company1Input = {
      name: "name1",
      email: "email1"
    };
    let responseData = await req.post("/companies")
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

    expect(responseData.length).to.gt(1);

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
    const associateResponseData: db.ICompany = await req.put(`/companies/${updatedCompanyInput.id}/associate/${updatedCategoryInput.id}`)
      .expect(200)
      .then((res) => res.body);

    const associatedCategory = associateResponseData.categories.find((category) => category.id === updatedCategoryInput.id);
    if (typeof associatedCategory !== "undefined") {
      expect(associatedCategory.id).to.eq(updatedCategoryInput.id);
    }

    // View
    await req.post("/categories")
      .send({ name: "categoryName2" })
      .expect(200)

    responseData = await req.get("/views")
      .expect(200)
      .then((res) => res.body);

    expect(typeof responseData.categoryId).to.eq("undefined");
    expect(responseData.categories.length).to.gt(1);
    expect(responseData.companies.length).to.gt(1);

    // View, filtered by category
    responseData = await req.get(`/views?categoryId=${updatedCategoryInput.id}`)
      .expect(200)
      .then((res) => res.body);

    expect(responseData.categoryId).to.eq(updatedCategoryInput.id);
    expect(responseData.categories.length).to.gt(1);
    expect(responseData.companies.length).to.eq(1);
    expect(responseData.companies[0].id).to.eq(updatedCompanyInput.id);
  })
});
