
# CRUD API using Node.js, Express, and MongoDB with an Object-Oriented Programming (OOP) . 

This project is a RESTful CRUD (Create, Read, Update, Delete) API built with Node.js and Express, utilizing MongoDB as the database. The application is designed with an Object-Oriented Programming (OOP) approach to enhance code organization, maintainability, and scalability.

### Key Features

- **CRUD Operations**: Implement robust endpoints for managing user data, including:
  - Create a new user
  - Retrieve user details
  - Retrieve all users
  - Update existing user information
  - Delete a user record
- **OOP Architecture**: Employ classes and methods to encapsulate the business logic, making the code more modular and easier to test.
- **MongoDB Integration**: Use MongoDB for data storage, taking advantage of its flexible schema and scalability.
- **Kafka Integration**: Implement a Kafka producer to produce user data from MongoDB to Kafka. (Producer Only)
- **Error Handling**: Implement proper error handling to ensure a smooth user experience and to help identify issues quickly.
- **Unit Testing**: Conduct thorough unit tests to validate the functionality of each endpoint and component.



## API Reference

#### All endpoints require a valid JWT in the Authorization header expect generate JWT Token:

```http
  Authorization: Bearer <token>
```

#### Get all users

```http
  GET /api/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accountNumber` | `number` | **Optional**. Account number of user |
| `identityNumber` | `number` | **Optional**. Identity number of user |

#### Get user detail

```http
  GET /api/users/details/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user |

#### Create a new user 

```http
  POST /api/users/create
```

POST to /api/users/create with JSON 
```bash
 {
  "userName": "test2",
  "accountNumber": 9723232,
  "emailAddress": "raywibowo2@gmail.com",
  "identityNumber": 92972422
}
```

#### Update user

```http
  GET /api/users/update/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user           |

#### Delete user

```http
  GET /api/users/delete/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user           |

#### Generate JWT Token

```http
  POST /api/token/generate
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET`

`JWT_EXPIRES_IN`

`MONGO_URI`
## Demo

https://adambetest-production.up.railway.app/
