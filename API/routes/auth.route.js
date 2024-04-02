import express from "express";
import { singIn, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", singIn);

export default router;
