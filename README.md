# Fastify JWT app (TypeORM, Postgresql)

Node.js project demonstrating the integration of Fastify, Fastify JWT, and TypeORM with PostgreSQL for building a robust API.

## Features

- Utilizes Fastify for blazing-fast web server development.
- Implements JWT-based authentication with Fastify JWT.
- Integrates TypeORM for seamless interaction with a PostgreSQL database.
- Provides CRUD operations for managing resources.

## Prerequisites

- Node.js installed on your machine
- PostgreSQL installed locally or accessible remotely
- Git for cloning the repository

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   cd <project-folder>
   make install
   ```

## Usage

To start the server using Docker Compose, make sure you have Docker installed on your machine. Then, navigate to the project directory and run the following command:

```bash
make start
```

> The server will be running on port 8080 by default

To run all unit test:

```bash
make test-unit
```

To stop the server and remove the containers, use the following command:

```bash
make stop
```

To clean up the project by removing running containers, volumes, node_modules, coverage, src/openapi.json, and dist, use the following command:

```
make clean
```

## API Documentation

To run the docs server:

> [!NOTE]  
> THE `make start` will run both the server and docs, to run the docs image alone, use the following command

```
make docs
```

> You can access the OpenAPI documentation for the API at [http://localhost:8080](http://localhost:8080). This documentation provides detailed information about the available endpoints, request parameters, responses, and schemas.

## Contributing

Contributions are welcome! If you find any issues or would like to propose enhancements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
