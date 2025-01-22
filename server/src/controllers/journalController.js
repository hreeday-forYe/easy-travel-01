import Journal from "../models/JournalModel.js";
import User from "../models/UserModel.js";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "cloudinary";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";

class JournalController {
  static createJournal = asyncHandler(async (req, res, next) => {
    try {
      const {
        title,
        content,
        mood,
        location,
        tags,
        images,
        isPrivate = true,
      } = req.body;

      if (!title && !content && !tags && !images) {
        let errors = {
          title: "Title is required",
          content: "Content is required",
          tags: "At least one Tag is required",
          images: "At least one image is required",
        };
        return next(new ErrorHandler("Journal Creation Failed!", 404, errors));
      }

      // Handle Image section using cloudinary

      // Increment the user Journal Entry
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { journalEntries: 1 },
      });

      // Create a new Journal
      let journal = await Journal.create({
        author: req.user._id,
        title,
        content,
        mood,
        location,
        tags,
        isPrivate,
        images,
      });

      return res.status(201).json({ success: true, journal });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  static getAllJournal = asyncHandler(async (req, res, next) => {
    try {
      const user = req.user;
      const allJournals = await Journal.find({ author: user._id });
      if (!allJournals || allJournals.length === 0) {
        return next(new ErrorHandler("No Journals Found", 404));
      }
      return res.status(200).json({ success: true, allJournals });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  static updateJournal = asyncHandler(async (req, res, next) => {
    try {
      const id = req.params.id;
      const { title, content, mood, location, tags, images, isPrivate } =
        req.body;

      // Handle Image Updation logic as well.

      const updatedJournal = await Journal.findByIdAndUpdate(
        id,
        {
          title,
          content,
          mood,
          location,
          tags,
          images,
          isPrivate,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedJournal) {
        return next(new ErrorHandler("Journal was not found", 400));
      }

      return res.status(201).json({ success: true, journal: updatedJournal });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  static deleteJournal = asyncHandler(async (req, res, next) => {
    try {
      const id = req.params.id;

      const author = await User.findById(req.user._id);

      if (!author) {
        return res
          .status(404)
          .json({ success: false, message: "Author not found!" });
      }

      const deletedJournal = await Journal.findByIdAndDelete(id);

      if (!deletedJournal) {
        return next(new ErrorHandler("Journal was not found", 400));
      }

      // Decrement the user Journal Entries
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { journalEntries: -1 },
      });

      return res
        .status(200)
        .json({ status: true, message: "Journal was deleted Successfully" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  static getSingleJournal = asyncHandler(async (req, res, next) => {
    try {
      const id = req.params.id;
      const journal = await Journal.findById(id);

      if (!journal) {
        return next(new ErrorHandler("Journal not found", 404));
      }
      return res.status(200).json({ success: true, journal });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
}

export default JournalController;
