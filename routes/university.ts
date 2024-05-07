import { Router } from "express";
import { authenticateUser, ensureAdmin } from "../middlewares/auth";
import {
  createUniversity,
  deleteUniversityByName,
  getUniversitiesByName,
  getAllUniversityDetails,
  updateUniversityByName,
  getUniversityDescription,
  getAllUniversities,
  getUniversityLinksById,
  getUniversityFAQById,
  getUniversityNames,
} from "../controllers/university";

const router = Router();

router.get("/:universityId/faq", getUniversityFAQById);
router.get("/:universityId/links", getUniversityLinksById);
router.get("/all", getAllUniversities);
router.get("/search", getUniversityNames)
router.get("/:universityId", getAllUniversityDetails);
router.get("/:universityId/description", getUniversityDescription);
router.get("/", getUniversitiesByName);
router.post("/",ensureAdmin, createUniversity);
router.put("/", ensureAdmin, updateUniversityByName);
router.delete("/", ensureAdmin, deleteUniversityByName);

export default router;
