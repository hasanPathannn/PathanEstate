import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(401, "Listing Not found"));
  }

  if (req.user.id !== listing.userRef) {
    return next(
      errorHandler(401, "You are not Authorized to Delete, Login first")
    );
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing Deleted");
  } catch (err) {
    next(err);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing Not Found!"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You are Not Authorized"));
  }

  try {
    const updatedList = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedList);
  } catch (err) {
    next(err);
  }
};

export const getListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Lisnting not found"));
  }

  try {
    res.status(200).json(listing);
  } catch (err) {
    next(err);
  }
};
