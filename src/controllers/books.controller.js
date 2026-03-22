const { ObjectId } = require("mongodb");
const { getBooksCollection } = require("../config/database");
const HttpError = require("../utils/httpError");

const getAllBooks = async (_req, res, next) => {
  try {
    const books = await getBooksCollection().find({}).sort({ createdAt: -1 }).toArray();

    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await getBooksCollection().findOne({ _id: new ObjectId(id) });

    if (!book) {
      throw new HttpError(404, "Book not found");
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

const createBook = async (req, res, next) => {
  try {
    const now = new Date();
    const newBook = {
      ...req.body,
      createdAt: now,
      updatedAt: now,
    };

    const result = await getBooksCollection().insertOne(newBook);
    const insertedBook = await getBooksCollection().findOne({ _id: result.insertedId });

    res.status(201).json({
      success: true,
      data: insertedBook,
    });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingBook = await getBooksCollection().findOne({ _id: new ObjectId(id) });

    if (!existingBook) {
      throw new HttpError(404, "Book not found");
    }

    const updatedBook = {
      ...req.body,
      createdAt: existingBook.createdAt || new Date(),
      updatedAt: new Date(),
    };

    await getBooksCollection().updateOne(
      { _id: new ObjectId(id) },
      {
        $set: updatedBook,
      }
    );

    const savedBook = await getBooksCollection().findOne({ _id: new ObjectId(id) });

    res.status(200).json({
      success: true,
      data: savedBook,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getBooksCollection().deleteOne({ _id: new ObjectId(id) });

    if (!result.deletedCount) {
      throw new HttpError(404, "Book not found");
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
