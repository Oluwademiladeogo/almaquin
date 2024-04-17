import { Router } from "express";
import {
  createUniversity,
  deleteUniversityById,
  deleteUniversityByName,
  getUniversityById,
  getUniversityByName,
  updateUniversityById,
  updateUniversityByName,
} from "../controllers/university";
import { authenticateUser, ensureAdmin } from "../middlewares/auth";
const router = Router();
router.get("/", authenticateUser, getUniversityByName);
router.post("/", ensureAdmin, createUniversity);
router.put("/", ensureAdmin, updateUniversityByName);
router.delete("/", ensureAdmin, deleteUniversityByName);

export default router;
