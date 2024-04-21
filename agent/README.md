# Agent Node

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)

## Overview
This is the agent node, which monitors CPU metrics and sends them to the central server.

## Technologies Used

- **Backend**: TypeScript is used to build the Agent Node.
- **Communication Protocol**: HTTP is used to communicate with central server.

## Prerequisites

Before running the central server, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- Docker (if running with Docker)

## Getting Started

To run the Agent Node, follow these steps:

1. **Using Docker Compose**: You can also run the agent node using Docker Compose.
   - In agent/ Directory Run the below:
     ```bash
     cp .env-docker-example .env-docker
     docker compose up --build
     ```

3. **Install Dependencies and Run The Project**:
   ```bash
   npm install
   cp .env-example .env
   npm run build
   node dist/index.js
   ```