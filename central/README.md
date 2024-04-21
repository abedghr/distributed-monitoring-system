# Central Server for Distributed Monitoring System

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [APIs](#apis)

## Overview

This is the central server component of the Distributed Monitoring System. It receives and stores CPU usage data from monitored nodes and provides APIs for querying performance statistics.


## Features

- **Node Monitoring**: Agents deployed on each node continuously monitor CPU usage metrics.
- **Central Server**: The central server receives and stores CPU usage data from all monitored nodes. It provides APIs for querying performance statistics for a specific server within a given time frame, including minimum, average, and maximum CPU usage.
- **Scalability**: The system is designed to be scalable and can handle monitoring across a large number of nodes.
- **Data Visualization**: Although visualization is not implemented in this version, the central server provides data suitable for time series visualization through APIs.


## Technologies Used

- **Backend**: Nest.js is used to build the central server due to its scalability and TypeScript support.
- **Database**: MongoDB is used to store CPU usage data.
- **Communication Protocol**: HTTP is used for communication between nodes and the central server.
- **Caching**: Redis is used for caching and queueing.

## Prerequisites

Before running the central server, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- Docker (if running with Docker)

## Getting Started

To run the central server, follow these steps:

1. **Without Using Docker Compose**: If you prefer not to use Docker to run the central server, ensure you have MongoDB and Redis installed on your machine. Alternatively, you can utilize the MongoDB and Redis services provided in the `docker-compose.yml` file located at the central/ directory of the project. 
  - In central/ Directory:
   ```bash
   cp .env-example .env
   ```
  - Update .env file.
  - In central/ Directory Run the below:
   ```bash
   npm install
   ```
  - If You want to use MongoDB and Redis services provided in the `docker-compose.yml`:
   ```bash
   docker network create central-network
   docker compose up -d --build central_mongo1 central_mongo2 central_mongo3 central_mongosetup central_redis
   ```
  - Run the project:
    ```bash
    npm run start:dev
    ```

2. **Using Docker Compose**: You can also run the central server using Docker Compose. Simply navigate to the root directory of the project and run the following command:
   - In central/ Directory: 
      - Run the below:
        ```bash
        cp .env-example .env
        ```
      - Change the HTTP_HOST inside .env :
        ```bash
        HTTP_HOST=0.0.0.0
        DATABASE_HOST=mongodb://central_mongo1:27017,central_mongo2:27018,central_mongo3:27019
        REDIS_URL=redis://central_redis:6379
        ```
      - Run the below:
        ```bash
        docker compose up --build
        ```

3. **Swagger**:
You can access the Swagger API documentation at http://localhost:3000/docs.

## APIs

### Nodes List

Retrieves a list of monitored nodes.

- **Endpoint**: `/api/cpu-metric/nodes-list`
- **HTTP Method**: GET
- **Request Body**: N/A

### CPU Metric Usage Statistics

Retrieves CPU metric usage statistics within a specified time range for a specific node.

- **Endpoint**: `/api/cpu-metric`
- **HTTP Method**: GET
- **Query Parameters**:
  - `dateTimeFrom`: Start date and time in ISO format EX: "2024-04-18 12:10:00".
  - `dateTimeTo`: End date and time in ISO format EX: "2024-04-19 12:10:00".
  - `node`: Node identifier (Node Name).
- **Request Body**: N/A
- **Grouping Interval Details**:
  - The CPU metric usage statistics API allows you to retrieve CPU usage data for a specific server within a specified time frame.

  - If you don't provide a start date and time (dateTimeFrom), the API defaults to the current date at 00:00:00 (midnight).

  - If you don't provide an end date and time (dateTimeTo), the API defaults to the current date at 23:59:59 (just before midnight).

  - The API calculates the difference between the start and end dates to determine the time span of the data.

  - Based on this time span, the API automatically determines the grouping interval for the CPU usage data:

    - If the time span is less than or equal to 1 day (24 hours), the data is grouped in intervals of 1 minute.
    - If the time span is less than or equal to 30 days (1 month), the data is grouped in intervals of 1 hour.
    - If the time span is greater than 30 days (1 month), the data is grouped in intervals of 1 day.

    This grouping helps provide a clear overview of CPU usage trends over the specified time frame.
- **Response**:
  - There is 2 fields in the response inside `data` field:
    - genericResult: contain the below for specific Period In General without grouping.
      - AVG CPU Usage AVG Percentage.
      - Minimum CPU Usage Percentage.
      - Maximum CPU Usage Percentage.
    - result: contain the below for specific Period grouped in intervals.
      - _id: DateTime.
      - AVG CPU Usage AVG Percentage.
      - Minimum CPU Usage Percentage.
      - Maximum CPU Usage Percentage.
      - Count Of Records In Each Group.

### Transmit Metrics

Transmits CPU metrics data from a monitored node to the central server.

- **Endpoint**: `/api/cpu-metric`
- **HTTP Method**: POST
- **Request Body**:
  ```json
  {
    "node": "string",
    "platform": "string",
    "usage": "number",
    "usagePercentage": "number",
    "averageCpuSpeed": "number",
    "minCpuSpeed": "number",
    "maxCpuSpeed": "number",
    "freeMemory": "number",
    "freeMemoryPercentage": "number",
    "totalMemory": "number",
    "date": "Date",
    "timestamp": "number"
  }