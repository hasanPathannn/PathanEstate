import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verify = (req, res, next) => {
  const token = req.cookies.Token;

  if (!token) {
    return next(errorHandler(401, "Unauthorizd"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(403, "Forbidden"));
    }
    req.user = user;
    next();
  });
};
