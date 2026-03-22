const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookshelf API",
      version: "1.0.0",
      description: "CRUD API for books with validation and error handling",
    },
    servers: [
      {
        url: "/",
      },
      {
        url: process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
    components: {
      schemas: {
        BookInput: {
          type: "object",
          required: ["title", "author"],
          properties: {
            title: { type: "string", example: "Clean Code" },
            author: { type: "string", example: "Robert C. Martin" },
            genre: { type: "string", example: "Software Engineering" },
            publishedYear: { type: "integer", example: 2008 },
            inStock: { type: "boolean", example: true },
          },
        },
        Book: {
          allOf: [
            { $ref: "#/components/schemas/BookInput" },
            {
              type: "object",
              properties: {
                _id: { type: "string", example: "65d77c8c9a68b3f81fdb64a9" },
                createdAt: { type: "string", format: "date-time" },
                updatedAt: { type: "string", format: "date-time" },
              },
            },
          ],
        },
        AuthorInput: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", example: "Robert C. Martin" },
            birthYear: { type: "integer", example: 1952 },
            nationality: { type: "string", example: "American" },
            biography: { type: "string", example: "Software engineer and author..." },
            website: { type: "string", format: "uri", example: "https://example.com" },
          },
        },
        Author: {
          allOf: [
            { $ref: "#/components/schemas/AuthorInput" },
            {
              type: "object",
              properties: {
                _id: { type: "string", example: "65d77c8c9a68b3f81fdb64a9" },
                createdAt: { type: "string", format: "date-time" },
                updatedAt: { type: "string", format: "date-time" },
              },
            },
          ],
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
