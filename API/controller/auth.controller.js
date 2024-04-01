import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const auth = async (req, res) => {
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
    .catch((err) => res.status(500).json(err.message));

  console.log(req.body);
};
