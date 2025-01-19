import Journal from "../models/JournalModel.js";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "cloudinary";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";

class JournalController {
  static createJournal = asyncHandler(async (req, res, next) => {
    try {
      const { title, content, mood, location, tags, images, isPrivate } =
        req.body;
      const user = req.user;

      if (!title && !content && !tags && !images) {
        return next(
          new ErrorHandler("Title, content, tags and images are required", 404)
        );
      }

      // Handle Image section using cloudinary

      // Create a new Journal
      let journal = await Journal.create({
        author: user._id,
        title,
        content,
        mood,
        location,
        tags,
        isPrivate,
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
      const deletedJournal = await Journal.findByIdAndDelete(id);

      if (!deletedJournal) {
        return next(new ErrorHandler("Journal was not found", 400));
      }
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
