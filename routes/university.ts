import { Router } from "express";
import {
  createUniversity,
  deleteUniversityByName,
  getUniversityByName,
  getAllUniversityDetails,
  updateUniversityByName,
  getUniversityDescription,
} from "../controllers/university";
import { authenticateUser, ensureAdmin } from "../middlewares/auth";
const router = Router();
router.get("/overview", authenticateUser, getAllUniversityDetails);
router.get("/description", authenticateUser, getUniversityDescription);
router.get("/", authenticateUser, getUniversityByName);
router.post("/", ensureAdmin, createUniversity);
router.put("/", ensureAdmin, updateUniversityByName);
router.delete("/", ensureAdmin, deleteUniversityByName);

export default router;
