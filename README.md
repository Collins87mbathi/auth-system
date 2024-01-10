# Authentication and Authorization System

This project is an Authentication and Authorization system built using Node.js and Express. It features JWT-based authentication, role-based access control, and Swagger-generated API documentation.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- PostgreSQL

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/Collins87mbathi/auth-system.git

   ```

2. **Navigate to the project directory**:
   Once you have cloned the repository, navigate to the project directory.

   ```sh
   cd auth-system

   ```

3. **Install the required npm packages**:
   Install all dependencies listed in `package.json` by running the following command:

   ```sh
   npm install

   ```

4. **Set up the environment variables**:
   Create a `.env` file in the root directory of the project. Include the following environment variables adjusted to your specific configuration:
   ```sh
   PORT = 8000
   DATABASE = 
   DATABASE_USER = 
   DATABASE_PASSWORD =
   ```
5. **Set up the environment variables**:
   Initialize the database (Make sure PostgreSQL is running):
   Run the database migrations with the Sequelize CLI to set up your schema in PostgreSQL.

   ```sh
   npx sequelize-cli db:migrate

   ```

6. **Start the development server**:
   Kick off the Express server with the `start` script defined in your `package.json`.

   ```sh
   npm start


   ```

This command will start the server on `http://localhost:8000` or the port you have specified in your environment variables.

### Usage

After starting the server, you can make API requests to endpoints defined under `/api/auth` for authentication and `/api/users` for user management.

To view and interact with the API documentation, navigate to `http://localhost:8000/api-docs` in your web browser.
