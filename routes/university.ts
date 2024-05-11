import { Router } from "express";
import { authenticateUser, ensureAdmin } from "../middlewares/auth";
import {
  createUniversity,
  getUniversityDescription,
  getAllUniversities,
  getUniversityLinksById,
  getUniversityFAQById,
  getUniversityNames,
  getUniversitybyId,
  searchUniversitiesByName,
  getUniversitySchoolNames,
  getUniversityByProgramType,
  getFieldByType,
  updateUniversityById,
  deleteUniversityById,
} from "../controllers/university";

const router = Router();

router.get("/all", getAllUniversities);
router.get("/search", getUniversityNames);
router.get("/:universityId/schools", getUniversitySchoolNames);
router.get("/:universityId/faq", getUniversityFAQById);
router.get("/:universityId/links", getUniversityLinksById);
router.get("/:universityId/description", getUniversityDescription);
router.get("/:universityId", getUniversitybyId);
router.get("/:universityId/:type", getUniversityByProgramType);
router.get("/:universityId/:type/:field", getFieldByType);
router.get("/", searchUniversitiesByName); //regex option using query params
router.post("/", ensureAdmin, createUniversity);
router.put("/:universityId", ensureAdmin, updateUniversityById);
router.delete("/:universityId", ensureAdmin, deleteUniversityById);

export default router;
