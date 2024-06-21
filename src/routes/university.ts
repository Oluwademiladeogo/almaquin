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
  filterUniversities,
} from "../controllers/university";

const router = Router();

router.get("/all", authenticateUser, getAllUniversities);
router.get("/search", authenticateUser, getUniversityNames);
router.get("/filter", filterUniversities);
router.get(
  "/:universityId/schools",
  authenticateUser,
  getUniversitySchoolNames
);
router.get("/:universityId/faq", getUniversityFAQById);
router.get("/:universityId/links", authenticateUser, getUniversityLinksById);
router.get(
  "/:universityId/description",
  authenticateUser,
  getUniversityDescription
);
router.get("/:universityId", authenticateUser, getUniversitybyId);
router.get(
  "/:universityId/:type",
  authenticateUser,
  getUniversityByProgramType
);
router.get("/:universityId/:type/:field", authenticateUser, getFieldByType);
router.get("/", authenticateUser, searchUniversitiesByName); //regex option using query params
router.post("/", ensureAdmin, createUniversity);
router.put("/:universityId", ensureAdmin, updateUniversityById);
router.delete("/:universityId", ensureAdmin, deleteUniversityById);

export default router;
