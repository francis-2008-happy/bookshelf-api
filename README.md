# Bookshelf API

REST API for managing books and authors with full CRUD operations, validation, error handling, Swagger docs, and GitHub OAuth authentication.

## Features

- Two collections: books and authors
- Full CRUD for both collections
- Joi validation on POST and PUT
- Centralized error handling middleware
- MongoDB Atlas integration
- Swagger UI docs at /api-docs
- GitHub OAuth login/logout with session-based auth

## Tech Stack

- Node.js
- Express
- MongoDB Node driver
- Passport + passport-github2
- express-session
- Joi
- swagger-ui-express + swagger-jsdoc

## Environment Variables

Create .env from .env.example and set:

- PORT
- MONGODB_URI
- DB_NAME
- BASE_URL
- SESSION_SECRET
- GITHUB_CLIENT_ID
- GITHUB_CLIENT_SECRET
- GITHUB_CALLBACK_URL

## Local Run

1. Install dependencies:

	npm install

2. Start development server:

	npm run dev

3. Open Swagger docs:

	http://localhost:3000/api-docs

## API Endpoints

### Auth

- GET /api/auth/github
- GET /api/auth/github/callback
- GET /api/auth/me
- POST /api/auth/logout

### Books

- GET /api/books
- GET /api/books/:id
- POST /api/books (auth required)
- PUT /api/books/:id (auth required)
- DELETE /api/books/:id (auth required)

### Authors

- GET /api/authors
- GET /api/authors/:id
- POST /api/authors (auth required)
- PUT /api/authors/:id (auth required)
- DELETE /api/authors/:id (auth required)

## Render Deployment

Set environment variables in Render:

- PORT
- MONGODB_URI
- DB_NAME
- BASE_URL=https://your-service.onrender.com
- SESSION_SECRET
- GITHUB_CLIENT_ID
- GITHUB_CLIENT_SECRET
- GITHUB_CALLBACK_URL=https://your-service.onrender.com/api/auth/github/callback

Use build command: npm install

Use start command: npm start

## Week 04 Video Checklist

- Show OAuth login route and successful login
- Show /api/auth/me before and after login
- Show protected route blocked when logged out (401)
- Show protected CRUD route success when logged in
- Show MongoDB updates in Atlas/Compass
- Show Swagger docs usage

