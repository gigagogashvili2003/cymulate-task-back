# Cymulate Backend

## Overview

A brief description of your project and its purpose.

## Prerequisites

Before starting, ensure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

### Step 1: Clone the Repository

Clone the project repository and navigate to its directory:

```bash
git clone git@github.com:gigagogashvili2003/cymulate-task-back.git
cd cymulate-task-back
```

### Step 2: Configure the Application

Copy the `.env.example` file to `.env` and update the values as needed:

```bash
cp .env.example .env
```

This will build the application and create a Docker image.

### Step 3: Start the Application

Start the application using the following command:

```bash
docker-compose up -d
```

This will start the application in the background.

### Step 4: To stop the application

To stop the application, run the following command:

```bash
docker-compose down
```

This will stop the application.
