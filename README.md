# Express-REST

## Introduction
Simple REST API which handles two models companies and categories and let to:
1. CRUD operations
2. Associate a category to a company
3. List companies filtered by categoryId
4. Includes `views` endpoint respond with data with below structure:
```
{
  categoryId
  categories,
  companies,
}
```
categories, companies are lists, companies can be filtered by categoryId

The app was deployed on (https://express-rest-100.herokuapp.com/)[https://express-rest-100.herokuapp.com/]


Frontend for it was implemented in [Angular-Jest](https://github.com/DariuszWietecha/angular-jest) and deployed on (https://angular-jest-100.herokuapp.com/)[https://angular-jest-100.herokuapp.com/].

## Implementation details
Main used dependencies:
- [express](https://github.com/expressjs/express)
- [notarealdb](https://github.com/mirkonasato/notarealdb)
- [notarealdb](https://github.com/visionmedia/supertest)
- [typescript](https://www.typescriptlang.org/)

During the implemented was used node v10.16.3.

## Running the workflow
1. Install dependencies and build using `npm install`.
2. To change the port to different than 3000: copy `example.env` as `.env` and update PORT variable value as required.
3. Run using `npm start`.
4. Rest API will be available on [http://localhost:3000](http://localhost:3000)(If port wasn't changed by `.env`).
5. To build API use `npm run build`.

## Testing
### Integration tests
1. Install dependencies and build using `npm install`.
3. Run API using `npm start`.
3. Run the Mocha in another command line by `npm test`.

### Manual testing
Web service can be tested using below CURL commands:
`curl https://express-rest-100.herokuapp.com/companies`
`curl https://express-rest-100.herokuapp.com/companies?categoryId=eae597d0-660b-11ea-9266-adf5decb4537`
`curl -X POST -H "Content-Type: application/json" -d '{"name":"Bussiness &Bussiness", "logoUrl":"Giant", "email":"bb@mail.com"}' https://express-rest-100.herokuapp.com/companies`
`curl -X PUT https://express-rest-100.herokuapp.com/companies/d79e0d20-6614-11ea-9aae-b98cde07bc8a/associate/a0308830-660b-11ea-9266-adf5decb4537`

`curl https://express-rest-100.herokuapp.com/categories`
`curl https://express-rest-100.herokuapp.com/categories/a0308830-660b-11ea-9266-adf5decb4537`
`curl -X POST -H "Content-Type: application/json" -d '{"name":"Another category"}' https://express-rest-100.herokuapp.com/categories`
`curl -X PUT -H "Content-Type: application/json" -d '{"name":"Another category ver3","id":"831d66f0-6615-11ea-9aae-b98cde07bc8a"}' https://express-rest-100.herokuapp.com/categories`

`curl https://express-rest-100.herokuapp.com/views`
`curl https://express-rest-100.herokuapp.com/views?categoryId=eae597d0-660b-11ea-9266-adf5decb4537`

## Notes
* .vscode directory was committed to the repository to let to debug the workflow execution and unit tests execution in VSCode.

## Endpoints
### Companies
1. Get copmanies list
* Request: 

  Method: `GET`

  URL: `http://localhost:3000/companies/`
  
  CURL command: `curl -i -H 'Accept: application/json' http://localhost:3000/companies/`

* Response:
```
[
  {
    "id":"f0a6d4b0-6591-11ea-a253-fd7829c2ab13","name":"Great Company",
    "logoUrl":"Great cube",
    "email":"mail@greatcompany.com",
    "categories":   [
      {
      "id": "a0308830-660b-11ea-9266-adf5decb4537",
      "name": "Big Category"
      },
      ...
    ]
  },
 ...   
]
```
2. Get copmanies list filtered by the category
* Request: 

  Method: `GET`

  URL: `http://localhost:3000/companies/?categoryId={categoryId}`

  Query Parameters: `categoryId: string`
  
  CURL command: `curl -i -H 'Accept: application/json' http://localhost:3000/companies/companies?categoryId=a0308830-660b-11ea-9266-adf5decb4537`

* Response:
```
[
  {
    "id":"f0a6d4b0-6591-11ea-a253-fd7829c2ab13","name":"Great Company",
    "logoUrl":"Great cube",
    "email":"mail@greatcompany.com",
    "categories":   [
      {
      "id": "a0308830-660b-11ea-9266-adf5decb4537",
      "name": "Big Category"
      }
    ]
  },   
]
```
3. Create company
* Request: 

  Method: `POST`

  URL: `http://localhost:3000/companies/`

  Body:

```
  {
    "name":"Huge Coroporation",
    "logoUrl":"Lion",
    "email":"hugecorop@mail.com",
    "categories":   [
      {
      "id": "a0308830-660b-11ea-9266-adf5decb4537",
      "name": "Big Category"
      }
    ]
  }
```
  
  CURL command: `curl -X POST -H "Content-Type: application/json" -d '{"name":"Huge Coroporation", "logoUrl":"Lion", "email":"hugecorop@mail.com", "categories": [{"id":"a0308830-660b-11ea-9266-adf5decb4537","name": "Big Category"}]}' http://localhost:3000/companies`

* Response:
```
[
  {
    "id":"f0a6d4b0-6591-11ea-a253-adf5decb4537",
    "name":"Huge Coroporation",
    "logoUrl":"Lion",
    "email":"hugecorop@mail.com",
    "categories":   [
      {
      "id": "a0308830-660b-11ea-9266-adf5decb4537",
      "name": "Big Category"
      }
    ]
  },   
]
```
4. Edit company
* Request: 

  Method: `PUT`

  URL: `http://localhost:3000/companies/`

  Body:

```
  {
    "name":"Huge Coroporation updated",
    "logoUrl":"Lion",
    "email":"hugecorop@mail.com",
    "categories":   [
      {
      "id": "a0308830-660b-11ea-9266-adf5decb4537",
      "name": "Big Category"
      },
      {
      "id": "a0308830-660b-11ea-9266-fd7829c2ab13",
      "name": "Large companies"
      }
    ]
  }
```
  
  CURL command: `curl -X POST -H "Content-Type: application/json" -d '{"name":"Huge Coroporation", "logoUrl":"Lion", "email":"hugecorop@mail.com", "categories": [{"id":"a0308830-660b-11ea-9266-adf5decb4537","name": "Big Category"}, {"id":"a0308830-660b-11ea-9266-fd7829c2ab13", "name": "Large companies" }]}' http://localhost:3000/companies`

* Response:
```
[
  {
    "id":"f0a6d4b0-6591-11ea-a253-adf5decb4537",
    "name":"Huge Coroporation updated",
    "logoUrl":"Lion",
    "email":"hugecorop@mail.com",
    "categories":   [
      {
      "id": "a0308830-660b-11ea-9266-adf5decb4537",
      "name": "Big Category"
      },
      {
      "id": "a0308830-660b-11ea-9266-fd7829c2ab13",
      "name": "Large companies"
      }
    ]
  },   
]
```
5. Associate a category to a company
* Request: 

  Method: `PUT`

  URL: `http://localhost:3000/companies/{companyId}/associate/{categoryId}`

  URL Parameters: `companyId: string, categoryId: string`

  CURL command: `curl -X PUT http://localhost:3000/companies/f0a6d4b0-6591-11ea-a253-adf5decb4537/associate/a0308830-660b-11ea-9266-adf5decb4537`

* Response:
```
[
  {
    "id":"f0a6d4b0-6591-11ea-a253-adf5decb4537",
    "name":"Huge Coroporation",
    "logoUrl":"Lion",
    "email":"hugecorop@mail.com",
    "categories":   [
      {
      "id": "a0308830-660b-11ea-9266-adf5decb4537",
      "name": "Big Category"
      }
    ]
  },   
]
```

### Categories
1. Get categories list
* Request: 

  Method: `GET`

  URL: `http://localhost:3000/categories/`
  
  CURL command: `curl -i -H 'Accept: application/json' http://localhost:3000/categories/`

* Response:
```
[
  {
    "id": "a0308830-660b-11ea-9266-adf5decb4537",
    "name": "Big Category"
  },
  {
    "id": "eae597d0-660b-11ea-9266-adf5decb4537",
    "name": "Small Category"
  },
 ...   
]
```
2. Create category
* Request: 

  Method: `POST`

  URL: `http://localhost:3000/categories/`

  Body:

```
{
  "id": "a0308830-660b-11ea-9266-adf5decb4537",
  "name": "Big Category"
}
```
  
  CURL command: `curl -X POST -H "Content-Type: application/json" -d '{"id":"a0308830-660b-11ea-9266-adf5decb4537", "name": "Big Category" }' http://localhost:3000/categories`

* Response:
```
{
  "id": "a0308830-660b-11ea-9266-adf5decb4537",
  "name": "Big Category"
}
```
3. Edit category
* Request: 

  Method: `PUT`

  URL: `http://localhost:3000/categories/`

  Body:

```
{
  "id": "a0308830-660b-11ea-9266-adf5decb4537",
  "name": "Big Category updated"
}
```
  
  CURL command: `curl -X PUT -H "Content-Type: application/json" -d '{ "id": "a0308830-660b-11ea-9266-adf5decb4537", "name": "Big Category updated" }' http://localhost:3000/categories`

* Response:
```
{
  "id": "a0308830-660b-11ea-9266-adf5decb4537",
  "name": "Big Category updated"
}   
```

### Views
1. Get categories and companies(may be filtered by categoryId).
* Request: 

  Method: `GET`

  URL: `http://localhost:3000/views/?categoryId={categoryId}`
  
  CURL command: 
  * `curl -i -H 'Accept: application/json' http://localhost:3000/views`
  * `curl -i -H 'Accept: application/json' http://localhost:3000/views?categoryId=a0308830-660b-11ea-9266-adf5decb4537`

* Response:
```
{ 
  categories: [
    {
      "id":"f0a6d4b0-6591-11ea-a253-fd7829c2ab13","name":"Great Company",
      "logoUrl":"Great cube",
      "email":"mail@greatcompany.com",
      "categories":   [
        {
        "id": "a0308830-660b-11ea-9266-adf5decb4537",
        "name": "Big Category"
        },
        ...
      ]
    },
  ...   
  ],
  categoryId: a0308830-660b-11ea-9266-adf5decb4537,
  companies: [
    {
      "id":"f0a6d4b0-6591-11ea-a253-fd7829c2ab13","name":"Great Company",
      "logoUrl":"Great cube",
      "email":"mail@greatcompany.com",
      "categories":   [
        {
        "id": "a0308830-660b-11ea-9266-adf5decb4537",
        "name": "Big Category"
        },
        ...
      ]
    },
  ...   
  ]
}
```