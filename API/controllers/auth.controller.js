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

export const singIn = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      errorHandler(404, "USER NOT FOUND");
    }
    const validPass = bcrypt.compareSync(password, validUser.password);
    if (!validPass) {
      errorHandler(404, "INVALID CREDENTIALS");
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(201)
      .cookie("Token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 36000 * 1000),
      })
      .json(rest);
  } catch (err) {
    next(err);
  }
};
