# Express Server with MongoDB

This is a simple Express server designed for learning purposes. It serves static webpages and connects to a MongoDB database. The project is organized with middlewares, controllers for API requests, routes, and a database connection file.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)

## Features

- Serve static HTML, CSS, and JavaScript files.
- Connect to MongoDB for data storage.
- Organized structure with middlewares, controllers, and routes.
- Basic CRUD operations through RESTful API.

## Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sumitRohilla/learning-express.git
   cd learning-express
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root of your project and add the following:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   ```

4. **Run the server:**
   ```bash
   npm start
   ```

## Usage

- The server will start on `http://localhost:3000`.
- Visit `http://localhost:3000` in your browser to view the static webpage.
- Use an API client like Postman to interact with the API endpoints.

## Project Structure

learning-express/\
│\
├── public/\
│ ├── index.html\
│ └── script.js\
│\
├── src/\
│ ├── controllers/
│ │ └── postController.js
│ ├── middlewares/
│ │ ├── error.js
│ │ ├── logger.js
│ │ └── notFound.js
│ ├── routes/
│ │ └── posts.js
│ ├── db/
│ │ └── connection.js
│ └── app.js
│
├── .env
├── .gitignore
├── package.json
└── README.md

## API Endpoints

#### GET /api/posts

- Description: Get all posts.
- Response:
  ```json
  [
    {
      "id": "1",
      "name": "post one"
    }
  ]
  ```

#### POST /api/posts

- Description: Create a new posts
- Request Body:
  ```json
  {
    "name": "New post"
  }
  ```
- Response:
  ```json
  {
    "id": "2",
    "name": "New post"
  }
  ```

#### PUT /api/posts/:id

- Description: Update a post
- Request Body:
  ```json
  {
    "name": "New post"
  }
  ```
- Response:

  ```json
  {
      "id": "2",
      "name": "New post"
  }
  ```

  #### DELETE /api/posts/:id

- Description: Delete a post
- Request Body:
  ```json
  {
    "name": "New post"
  }
  ```
- Response:
  ```json
  {
    "id": "2",
    "name": "New post"
  }
  ```
