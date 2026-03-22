const { ObjectId } = require("mongodb");
const { getAuthorsCollection } = require("../config/database");
const HttpError = require("../utils/httpError");

const getAllAuthors = async (_req, res, next) => {
  try {
    const authors = await getAuthorsCollection().find({}).sort({ createdAt: -1 }).toArray();

    res.status(200).json({
      success: true,
      data: authors,
    });
  } catch (error) {
    next(error);
  }
};

const getAuthorById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await getAuthorsCollection().findOne({ _id: new ObjectId(id) });

    if (!author) {
      throw new HttpError(404, "Author not found");
    }

    res.status(200).json({
      success: true,
      data: author,
    });
  } catch (error) {
    next(error);
  }
};

const createAuthor = async (req, res, next) => {
  try {
    const now = new Date();
    const newAuthor = {
      ...req.body,
      createdAt: now,
      updatedAt: now,
    };

    const result = await getAuthorsCollection().insertOne(newAuthor);
    const insertedAuthor = await getAuthorsCollection().findOne({ _id: result.insertedId });

    res.status(201).json({
      success: true,
      data: insertedAuthor,
    });
  } catch (error) {
    next(error);
  }
};

const updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingAuthor = await getAuthorsCollection().findOne({ _id: new ObjectId(id) });

    if (!existingAuthor) {
      throw new HttpError(404, "Author not found");
    }

    const updatedAuthor = {
      ...req.body,
      createdAt: existingAuthor.createdAt || new Date(),
      updatedAt: new Date(),
    };

    await getAuthorsCollection().updateOne(
      { _id: new ObjectId(id) },
      {
        $set: updatedAuthor,
      }
    );

    const savedAuthor = await getAuthorsCollection().findOne({ _id: new ObjectId(id) });

    res.status(200).json({
      success: true,
      data: savedAuthor,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getAuthorsCollection().deleteOne({ _id: new ObjectId(id) });

    if (!result.deletedCount) {
      throw new HttpError(404, "Author not found");
    }

    res.status(200).json({
      success: true,
      message: "Author deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
