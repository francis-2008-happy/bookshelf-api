const express = require("express");
const session = require("express-session");
const booksRouter = require("./routes/books.routes");
const authorsRouter = require("./routes/authors.routes");
const authRouter = require("./routes/auth.routes");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");
const { swaggerUi, swaggerSpec } = require("./docs/swagger");
const { passport, initPassport } = require("./config/passport");

const app = express();
initPassport();

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Bookshelf API is running",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/books", booksRouter);
app.use("/api/authors", authorsRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
