import express from "express";
import { test } from "../controllers/user.controller.js";
import { updateUser } from "../controllers/user.controller.js";
import { verify } from "../utils/verifyUser.js";
const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verify, updateUser);

export default router;
