import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import Listing from "../models/listing.model.js";

export const test = (req, res) => {
  res.json({
    name: "Hasan",
    interser: "Thick thighs",
    test: "controller is working",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "Unauthorizd id"));
  }

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updateCurrUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateCurrUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const userDelete = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(402, "You cant delete others account!"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("Token");
    res.status(200).json({ message: "User has been deleted Successfully" });
  } catch (err) {
    next(err);
  }

  console.log("Checking userDeletion");
};

export const userListing= async(req,res,next)=>{
  if(req.user.id===req.params.id){
    try{
    const listings = await Listing.find({userRef:req.params.id});
    res.status(200).json(listings);
  }
    catch(err){
      next(err);
    }
  }
  else{
    return next(errorHandler(401,"Can't Show others listing here!"));
  }
};