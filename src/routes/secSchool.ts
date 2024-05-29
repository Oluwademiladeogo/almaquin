import express from "express";
import {
  getAllSchools,
  createSchool,
  updateSchool,
  deleteSchool,
} from "../controllers/secSchool";
import { ensureAdmin } from "../middlewares/auth";

const router = express.Router();

router.get("/", getAllSchools);
router.post("/", ensureAdmin, createSchool);
router.put("/", ensureAdmin, updateSchool);
router.delete("/", ensureAdmin, deleteSchool);

export default router;
