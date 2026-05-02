import express from "express";
import {
  loginAdmin,
  getAdminProfile,
} from "../../controllers/admin/adminController.js";

import { protectAdmin } from "../../middleware/authMiddleware.js";
import { getSubmissions } from "../../controllers/admin/adminController.js";


const router = express.Router();

router.post("/login", loginAdmin);
router.get("/profile", protectAdmin, getAdminProfile);
router.get("/submissions", protectAdmin, getSubmissions);
export default router;