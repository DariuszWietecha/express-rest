# Express-rest-api

## Introduction
Simple company management system where you will be able to create new companies, edit old ones, assign them to categories and list them either unfiltered or based on certain categories.
The app was deployed on https://express-rest-api-100.herokuapp.com/

### Running the workflow
1. Install dependencies and build using `npm install`.
3. Run using `npm start`.
3. Rest API will be available on [http://localhost:4000](http://localhost:3000).
4. To build API use `npm run build`.

### Testing
#### Integration tests
1. Install dependencies and build using `npm install`.
3. Run using `npm start`.
3. Run the Mocha by `npm test`.

#### Integration tests
Web service can be tested using below CURL commands:
`curl https://express-rest-api-100.herokuapp.com/companies`
`curl https://express-rest-api-100.herokuapp.com/companiescategoryId=eae597d0-660b-11ea-9266-adf5decb4537`
`curl -X POST -H "Content-Type: application/json" -d '{"name":"Bussiness &Bussiness", "logoUrl":"Giant", "email":"bb@mail.com"}' https://express-rest-api-100.herokuapp.com/companies`
`curl -X PUT https://express-rest-api-100.herokuapp.com/companies/d79e0d20-6614-11ea-9aae-b98cde07bc8a/associate/a0308830-660b-11ea-9266-adf5decb4537`

`curl https://express-rest-api-100.herokuapp.com/categories`
`curl https://express-rest-api-100.herokuapp.com/categories/a0308830-660b-11ea-9266-adf5decb4537`
`curl -X POST -H "Content-Type: application/json" -d '{"name":"Another category"}' https://express-rest-api-100.herokuapp.com/categories`
`curl -X PUT -H "Content-Type: application/json" -d '{"name":"Another category ver3","id":"831d66f0-6615-11ea-9aae-b98cde07bc8a"}' https://express-rest-api-100.herokuapp.com/categories`

`curl https://express-rest-api-100.herokuapp.com/views`
`curl https://express-rest-api-100.herokuapp.com/views?categoryId=eae597d0-660b-11ea-9266-adf5decb4537`

## Notes
* .vscode directory was committed to the repository to let to debug the workflow execution and unit tests execution in VSCode.