# Bookshelf API

REST API for managing books with full CRUD operations, validation, error handling, MongoDB storage, and Swagger API documentation.

## Features

- Create, Retrieve, Update, Delete (CRUD) for books
- Request validation using Joi
- Centralized error handling middleware
- MongoDB integration
- Swagger UI documentation at `/api-docs`

## Tech Stack

- Node.js
- Express
- MongoDB (`mongodb` driver)
- Joi
- Swagger (`swagger-ui-express`, `swagger-jsdoc`)

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

3. Add your MongoDB values to `.env`:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
DB_NAME=bookshelf_api
```

4. Run the API:

```bash
npm run dev
```

## API Endpoints

- `GET /` - Health check
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get one book by id
- `POST /api/books` - Create a book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book
- `GET /api-docs` - Swagger UI documentation

### Sample POST / PUT Body

```json
{
  "title": "The Pragmatic Programmer",
  "author": "Andrew Hunt",
  "genre": "Software Engineering",
  "publishedYear": 1999,
  "inStock": true
}
```

## Render Deployment

1. Push project to GitHub.
2. Create a new Web Service in Render from your repo.
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables in Render:
   - `PORT` (Render can also inject this automatically)
   - `MONGODB_URI`
   - `DB_NAME`
   - Optional: `BASE_URL` with your Render URL (for Swagger server URL)
6. Deploy and verify routes and `/api-docs`.

## Submission Checklist (Week 03)

- CRUD routes implemented and tested
- Validation added
- Error handling added
- Documentation includes all routes
- GitHub link ready
- Render link ready
- YouTube demo link ready
