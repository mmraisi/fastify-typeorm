# Fastify JWT app (TypeORM, Postgresql)

Node.js project demonstrating the integration of Fastify, Fastify JWT, and TypeORM with PostgreSQL for building a robust API.

## Features

-   Utilizes Fastify for blazing-fast web server development.
-   Implements JWT-based authentication with Fastify JWT.
-   Integrates TypeORM for seamless interaction with a PostgreSQL database.
-   Provides CRUD operations for managing resources.

## Prerequisites

-   Node.js installed on your machine
-   PostgreSQL installed locally or accessible remotely
-   Git for cloning the repository

## Getting Started

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Install dependencies:

    ```bash
    cd <project-folder>
    npm install
    ```

3. Set up environment variables:
    ```bash
     DATABASE_USER=your_db_user
     DATABASE_HOST=your_db_host
     DATABASE_PASSWORD=your_db_pass
     DATABASE_NAME=your_db_name
     DATABASE_PORT=your_db_port
    ```
4. Run the application:
   `npm start`

## API Endpoints

-   **POST /register**: Register a new user.
-   **POST /login**: Authenticate and generate JWT token.
-   **GET /profile**: Get user profile (requires authentication).
-   **POST /logout**: Invalidate current JWT token (requires authentication).

## Contributing

Contributions are welcome! If you find any issues or would like to propose enhancements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
