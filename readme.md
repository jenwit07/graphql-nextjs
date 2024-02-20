### NEWS Service
This project is a simple "NEWS" service built with a Next.js frontend, a GraphQL and Express.js backend, and a MongoDB database. The application is containerized using Docker Compose for easy setup and deployment.

## Prerequisites
Before you begin, ensure you have the following installed on your system:
 - Docker
 - Docker Compose

## Getting Started
Follow these steps to get the application up and running:

1.Clone the Repository
```sh
git clone https://github.com/your-username/news-service.git
cd news-service
```

2.Build and Start the Containers
```sh
docker-compose up --build
```

3.Access the Application

Once the containers are up and running, you can access:
 - The frontend at http://localhost:3000
 - The GraphQL playground at http://localhost:4000/graphql