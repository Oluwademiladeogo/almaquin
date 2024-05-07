import { Router } from "express";
import { authenticateUser, ensureAdmin } from "../middlewares/auth";
import {
  createUniversity,
  deleteUniversityByName,
  updateUniversityByName,
  getUniversityDescription,
  getAllUniversities,
  getUniversityLinksById,
  getUniversityFAQById,
  getUniversityNames,
  getUniversitybyId,
  searchUniversitiesByName,
} from "../controllers/university";

const router = Router();

router.get("/all", getAllUniversities);
router.get("/search", getUniversityNames);
router.get("/:universityId/faq", getUniversityFAQById);
router.get("/:universityId/links", getUniversityLinksById);
router.get("/:universityId", getUniversitybyId);
router.get("/:universityId/description", getUniversityDescription);
router.get("/", searchUniversitiesByName);
router.post("/", ensureAdmin, createUniversity);
router.put("/", ensureAdmin, updateUniversityByName);
router.delete("/", ensureAdmin, deleteUniversityByName);

export default router;
