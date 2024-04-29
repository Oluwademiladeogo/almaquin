import { Router } from "express";
import { authenticateUser, ensureAdmin } from "../middlewares/auth";
import {
  createUniversity,
  deleteUniversityByName,
  getUniversitiesByName,
  getAllUniversityDetails,
  updateUniversityByName,
  getUniversityDescription,
  allUniversities,
  getUniversityLinksById,
  getUniversityFAQById,
} from "../controllers/university";

const router = Router();

router.get("/:universityId/faq", getUniversityFAQById);
router.get("/:universityId/links", getUniversityLinksById);
router.get("/all", authenticateUser, allUniversities);
router.get("/:universityId", authenticateUser, getAllUniversityDetails);
router.get("/:universityId/description", authenticateUser, getUniversityDescription);
router.get("/", authenticateUser, getUniversitiesByName);
router.post("/", ensureAdmin, createUniversity);
router.put("/", ensureAdmin, updateUniversityByName);
router.delete("/", ensureAdmin, deleteUniversityByName);

export default router;
