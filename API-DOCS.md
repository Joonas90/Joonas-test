API Documentation
Introduction
Welcome to the API documentation for the Awesome Application. This document provides details on the available endpoints, request formats, and authentication methods.

Base URL
All API requests should be made to the following base URL:

http://localhost:8001/awesome

Authentication
The Awesome Application uses Bearer Token authentication. Include the access token in the Authorization header for secure access to protected endpoints.

Endpoints


1. Create User
Endpoint
Method: POST
URL: /applicant
Authentication: Bearer Token
Headers:
tenantId: {tenantId}
productId: {productId}
Request Body
json
Copy code
{
    "email": "dh121t11221121111@gmail.com",
    "username": "jira1112111111",
    "password": "Terms3432343",
    "userType": "USER"
}


2. Log In
Endpoint
Method: POST
URL: /applicant/login
Authentication: Bearer Token
Headers:
tenantId: {tenantId}
productId: {productId}
Request Body
json
Copy code
{
    "username": "jira111211111",
    "password": "Terms3432343"
}


3. Create Task
Endpoint
Method: POST
URL: /tasks/createTask
Authentication: Bearer Token
Request Body
json
Copy code
{
    "title": "some task",
    "description": "something",
    "priority": 6,
    "status": "ACTIVE"
}


4. Get Tasks Under User
Endpoint
Method: GET
URL: /tasks/tasks
Authentication: Bearer Token


5. Delete Task
Endpoint
Method: DELETE
URL: /tasks/deleteTask
Authentication: Bearer Token
Query Parameter:
id: {taskId}


6. Update Task
Endpoint
Method: PUT
URL: /tasks/updateTask
Authentication: Bearer Token
Query Parameter:
id: {taskId}
Request Body
json
Copy code
{
    "title": "",
    "description": ""
}


7. Refresh Access Token
Endpoint
Method: GET
URL: /auth/refresh
Request Body
json
Copy code
{
    "refreshToken": "{refreshToken}"
}


Conclusion
This concludes the API documentation for the Awesome Application. If you have any questions or need further assistance, please contact the development team.

postman collection for import is included in the root directory of this project
