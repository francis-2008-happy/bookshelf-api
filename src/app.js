const express = require("express");
const booksRouter = require("./routes/books.routes");
const authorsRouter = require("./routes/authors.routes");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");
const { swaggerUi, swaggerSpec } = require("./docs/swagger");

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Bookshelf API is running",
  });
});

app.use("/api/books", booksRouter);
app.use("/api/authors", authorsRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
