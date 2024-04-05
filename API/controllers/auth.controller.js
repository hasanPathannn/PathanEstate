import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashPassword = bcrypt.hashSync(password, 10);

  await User.create({
    username,
    email,
    password: hashPassword,
  })
    .then(() => res.status(201).json("User has been added to db"))
    .catch((err) => next(err));

  console.log(req.body);
};

export const signIn = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "USER NOT FOUND"));
    }
    const validPass = bcrypt.compareSync(password, validUser.password);
    if (!validPass) {
      return next(errorHandler(404, "INVALID CREDENTIALS"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(201)
      .cookie("Token", token, {
        httpOnly: true,
        // expires: new Date(Date.now() + 24 * 36000 * 1000),
      })
      .json(rest);
  } catch (err) {
    next(err);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("Token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPassword = bcrypt.hashSync(generatePassword, 10);
      console.log(hashPassword);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashPassword,
        avatar: req.body.photo,
      });

      await newUser.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("Token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (err) {
    next(err);
  }
};
