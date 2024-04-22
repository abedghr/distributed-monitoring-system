# Distributed Monitoring System

## Table of Contents

- [Overview](#overview)
- [Documentation](#documentation)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Directory Structure](#project-directory-structure)
- [Performance Optimization Note](#performance-optimization-note)
- [Getting Started](#getting-started)

## Overview

This project implements a Distributed Monitoring System for tracking server performance metrics across a network of nodes. It consists of a central server and agents deployed on each monitored node. The agents continuously monitor CPU usage metrics and transmit the data to the central server at regular intervals.


## Documentation

- [Central Server Documentation](central/README.md)
- [Agent Node Documentation](agent/README.md)

## Features

- **Node Monitoring**: Agents deployed on each node continuously monitor CPU usage metrics.
- **Central Server**: The central server receives and stores CPU usage data from all monitored nodes. It provides APIs for querying performance statistics for a specific server within a given time frame, including minimum, average, and maximum CPU usage.
- **Scalability**: The system is designed to be scalable and can handle monitoring across a large number of nodes.
- **Data Visualization**: Although visualization is not implemented in this version, the central server provides data suitable for time series visualization through APIs.


## Technologies Used

- **Backend**: Nest.js is used to build the Central Server [Central Server Documentation](central/README.md) due to its scalability and TypeScript support. The Agent Node [Agent Node Documentation](agent/README.md), responsible for monitoring nodes, is also built using TypeScript.
- **Database**: MongoDB is used to store CPU usage data.
- **Messaging**: Redis is utilized for caching and queueing CPU usage data.
- **Deployment**: Docker and Docker Compose are used for containerization and orchestration of the system.

## Project Directory Structure

```bash
project-root/
├── agent/
│ ├── api/
│ ├── interfaces/
│ ├── index.ts
│ ├── cpuMetrics.ts
│ ├── Dockerfile
│ ├── docker-compose.yml
│ ├── .env-example
│ └── .env-docker-example
└── central/
├──  src/
│ ├── app/
│ │ ├── controllers/
│ │ ├── services/
│ │ └── modules/
│ │ └── cpu/
│ ├── common/
│ │ ├── configs/
│ │ ├── database/
│ │ ├── doc/
│ │ ├── helper/
│ │ ├── redis/
│ │ ├── request/
│ │ └── response/
│ └── module/
│ └── cpu/
├── main.ts
├── swagger.ts
├── Dockerfile
├── docker-compose.yml
└── .env-example
```

## Performance Optimization Note

In this monitoring system setup, we've implemented several performance optimizations to ensure efficient data handling:

- **MongoDB Replica Set**: The monitoring system utilizes a MongoDB cluster with three nodes, including one primary and two secondary nodes. By reading data from secondary nodes, we enhance performance and distribute the load across the cluster.

- **MongoDB Index Optimization**: implemented indexes to enhance the performance of querying.
   - `node-timestamp-ndx`: Used for [GET] "/api/cpu-metric" API.
   - `timestamp-ndx`: Used for [GET] "/api/nodes-list" API.

- **Redis Caching and Queueing**: Redis is employed for caching and queuing purposes. Instead of inserting data into the database every 5 seconds, we leverage Redis to cache the data and insert it into MongoDB as a bulk operation every 30 seconds. This approach minimizes the number of insert queries and enhances system efficiency.

- **Additional Note**:
To further optimize system performance and prevent excessive strain on resources, consider setting a maximum period between the `from` and `to` parameters in queries. This can help avoid requesting overly large data periods that might overwhelm the system. Adjusting this parameter can enhance system responsiveness and stability.


## Getting Started

To run the monitoring system using Docker, follow these steps:

1. **Install Docker**: If you don't have Docker installed on your machine, download and install it from the [official Docker website](https://www.docker.com/get-started).

2. **Create a Docker Network**: Create a new Docker network by running the following command in your terminal:
```bash
   docker network create monitoring-system-network
```

3. **Create .env Files**: Before running Docker Compose, create the necessary .env files:
   - Copy the `.env-example` file to `.env` (this file related to central server) in the root directory of the project (environment variables are ready for running by using docker-compose so you don't need to change any thing). Run:
     ```
     cp .env-example .env
     ```
   - Inside the `agent` directory, create two .env files:
     - Copy the `.env-example` file to `.env`. Run:
       ```
       cp agent/.env-example agent/.env
       ```
     - Copy the `.env-docker-example` file to `.env-docker` (environment variables are ready for running by using docker-compose so you don't need to change any thing). Run:
       ```
       cp agent/.env-docker-example agent/.env-docker
       ```
   - Inside the `central` directory, create a .env file:
     - Copy the `.env-example` file to `.env`. Run:
       ```
       cp central/.env-example central/.env
       ```

4. **Run Docker Compose**: Run the following command to build and start all the services required for the monitoring system:

- This command will start the following services:
  - MongoDB Cluster: Three nodes with one primary and two secondary nodes. A setup script is included to configure replication.
  - Redis: Used for caching and queueing.
  - Central Server: Nest.js application for the central server.
  - Agent Nodes: Two instances of the agent node service.

```bash
   docker compose up --build
```

5. **Swagger**:
You can access the Swagger API documentation at http://localhost:3000/docs.

Once all the services are up and running, you can connect to the central server to view and analyze the monitored data.
