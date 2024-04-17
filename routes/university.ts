import { Router } from "express";
import {
  createUniversity,
  deleteUniversityById,
  getUniversityById,
  getUniversityByName,
  updateUniversityById,
} from "../controllers/university";
const router = Router();
router.get("/:id", getUniversityById);
router.get("/", getUniversityByName)
router.post("/", createUniversity);
router.put("/:id", updateUniversityById);
router.delete("/:id", deleteUniversityById);

export default router;
