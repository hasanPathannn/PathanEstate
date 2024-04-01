import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";

export const auth = async (req, res, next) => {
  const { username, email, password } = req.body;
  //   const newUser = new User({
  //     name,
  //     email,
  //     password,
  //   });

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
