## Running the Application with Docker

This project includes a `docker-compose.yml` file to simplify the process of setting up and running the application using Docker.

#### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your local machine.
- [Docker Compose](https://docs.docker.com/compose/install/) installed (usually included with Docker Desktop).

#### 1. Download the `docker-compose.yml` file:
```
curl -O https://raw.githubusercontent.com/rostislav-ivanov/home-cooking-recipes/main/Docker-compose.yaml

```

#### 2. Start the application:

```
docker-compose up -d --build

```
