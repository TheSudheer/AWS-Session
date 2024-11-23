
# Multi-Service Docker Compose Setup

This repository contains a `docker-compose.yml` configuration that defines three services (`app1`, `app2`, and `app3`) built from the same Dockerfile, with environment variables dynamically loaded from a `.env` file. Each service is exposed on unique ports to avoid conflicts.

---

## Project Structure

```
.
├── Dockerfile          # Instructions for building the application image
├── docker-compose.yml  # Multi-service Docker Compose configuration
├── .env                # Environment variables shared across services
├── package.json        # Node.js package file (used in Dockerfile)
├── server.js           # Node.js application entry point
└── README.md           # Documentation for the setup
```

---

## Prerequisites

- **Docker**: Install [Docker](https://www.docker.com/get-started) on your machine.
- **Docker Compose**: Ensure Docker Compose is installed (bundled with Docker Desktop).

---

## Environment Variables

The `.env` file contains shared environment variables used by all services. Below is an example of the `.env` file:

```env
DOMAIN=http://localhost:3000
PORT=3000
STATIC_DIR=./client
PUBLISHABLE_KEY=pk_test_51L5AsSSCC8JVWfvgEtfJkzHMTh7Z5PLY5m1yhR379sJgwAVZEe13NaiG33wsHSyHnPJMjTNOosiPk6AeMI8q0ims0049IKffiu
SECRET_KEY=sk_test_51L5AsSSCC8JVWfvgxpyZvQyBRRkHmGBkdyIa94vPD3Zs71qbHGrnSPlrJOIWiR74fbcn1A85yESCFnrrp3aX0Oz900JaunHrhe
```
---

## Configuration Overview

### `docker-compose.yml`

- **Services**:
  - **app1**:
    - Uses `.env` for environment variables.
    - Sets `APP_NAME=app1`.
    - Exposed on port `3001`.
  - **app2**:
    - Similar to `app1`, but sets `APP_NAME=app2` and uses port `3002`.
  - **app3**:
    - Similar to `app1`, but sets `APP_NAME=app3` and uses port `3003`.

### Dockerfile

The `Dockerfile` is shared across all services, building the application from a Node.js base image.

---

## Usage

### 1. Clone the Repository

```bash
git clone https://github.com/TheSudheer/AWS-Session.git
cd AWS-Session
```

### 2. Add the `.env` File

Create a `.env` file in the root of the project with the variables mentioned above.

### 3. Build and Run the Containers

Run the following command to build and start the services:

```bash
docker-compose up --build
```

### 4. Access the Services

Each service is exposed on a different port:

- **app1**: [http://localhost:3001](http://localhost:3001)
- **app2**: [http://localhost:3002](http://localhost:3002)
- **app3**: [http://localhost:3003](http://localhost:3003)

---

## Verifying Environment Variables

You can verify the loaded environment variables for each service using the following command:

```bash
docker exec -it <container_name> env
```

Replace `<container_name>` with the name of the running container, such as `aws-session-app1-1`.

---

## Troubleshooting

- **Port Binding Errors**: Ensure the ports (`3001`, `3002`, `3003`) are not already in use on your system. You can modify these ports in the `docker-compose.yml` file if needed.
- **Environment Variable Issues**: Double-check the `.env` file to ensure all required variables are defined.


