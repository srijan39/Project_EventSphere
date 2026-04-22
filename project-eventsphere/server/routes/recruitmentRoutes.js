import express from "express";
import { submitRecruitment } from "../controllers/recruitmentController.js";

const router = express.Router();

router.post("/submit", submitRecruitment);

export default router;