const { MongoClient } = require("mongodb");
const HttpError = require("../utils/httpError");

let db;

const connectToDatabase = async () => {
  const { MONGODB_URI, DB_NAME } = process.env;

  if (!MONGODB_URI || !DB_NAME) {
    throw new HttpError(500, "Missing MONGODB_URI or DB_NAME environment variable");
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db(DB_NAME);
  return db;
};

const getDb = () => {
  if (!db) {
    throw new HttpError(500, "Database not initialized");
  }

  return db;
};

const getBooksCollection = () => getDb().collection("books");
const getAuthorsCollection = () => getDb().collection("authors");

module.exports = {
  connectToDatabase,
  getBooksCollection,
  getAuthorsCollection,
};
