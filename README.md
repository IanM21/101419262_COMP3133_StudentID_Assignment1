# Employee Management System - GraphQL API

## Description
A backend application for Employee Management System built using NodeJS, Express, GraphQL, and MongoDB.

## Technologies Used
- Node.js
- Express
- GraphQL (Apollo Server)
- MongoDB with Mongoose
- bcrypt for password encryption

## Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/IanM21/101419262_COMP3133_StudentID_Assignment1
cd 101419262_COMP3133_StudentID_Assignment1
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file in the root directory
```env
MONGODB_URI=mongodb://localhost:27017/comp3133_assignment1
PORT=4000
```

4. Start the server
```bash
npm start
```

The GraphQL playground will be available at: http://localhost:4000/graphql

## Sample User Credentials
```json
{
  "username": "testadmin",
  "email": "admin@example.com",
  "password": "password123"
}
```

## GraphQL Operations

### User Operations

1. **Sign Up**
```graphql
mutation {
  signup(input: {
    username: "testadmin",
    email: "admin@example.com",
    password: "password123"
  }) {
    _id
    username
    email
  }
}
```

2. **Login**
```graphql
query {
  login(input: {
    username: "testadmin",
    password: "password123"
  }) {
    _id
    username
    email
  }
}
```

### Employee Operations

1. **Create Employee**
```graphql
mutation {
  createEmployee(input: {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    gender: "Male",
    designation: "Software Engineer",
    salary: 5000,
    date_of_joining: "2024-02-16",
    department: "Engineering"
  }) {
    _id
    first_name
    last_name
    email
  }
}
```

2. **Get All Employees**
```graphql
query {
  getAllEmployees {
    _id
    first_name
    last_name
    email
    designation
    department
    salary
  }
}
```

3. **Get Employee by ID**
```graphql
query {
  getEmployeeById(id: "employee_id_here") {
    first_name
    last_name
    email
    designation
    salary
  }
}
```

4. **Update Employee**
```graphql
mutation {
  updateEmployee(
    id: "employee_id_here",
    input: {
      salary: 6000,
      designation: "Senior Software Engineer"
    }
  ) {
    _id
    first_name
    designation
    salary
  }
}
```

5. **Delete Employee**
```graphql
mutation {
  deleteEmployee(id: "employee_id_here")
}
```

6. **Search Employees by Filter**
```graphql
query {
  getEmployeesByFilter(
    department: "Engineering",
    designation: "Software Engineer"
  ) {
    first_name
    last_name
    designation
    department
  }
}
```

## Testing
You can test the API using GraphiQL interface at http://localhost:4000/graphql

## Additional Notes
- All passwords are encrypted using bcrypt
- Timestamps are automatically managed
- Employee salaries must be ≥1000
- Email addresses must be unique across the system

## Author
Ian McDonald - 101419262