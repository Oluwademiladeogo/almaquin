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
  getUniversitySchoolNames,
  getUniversityByProgramType,
  getUniversityFluidStudents,
  getUniversityFees,
  getUniversityExams,
  getUniversityDates,
  getUniversityAdmissions,
  getUniversityDocuments,
} from "../controllers/university";

const router = Router();

router.get("/all", getAllUniversities);
//to be moved to a new endpoint
router.get("/search", getUniversityNames);
router.get("/:universityId/schools", getUniversitySchoolNames);
router.get("/:universityId/faq", getUniversityFAQById);
router.get("/:universityId/links", getUniversityLinksById);
router.get("/:universityId/description", getUniversityDescription);
router.get("/:universityId/fluid-students", getUniversityFluidStudents);
router.get("/:universityId/exams", getUniversityExams);
router.get("/:universityId/fees", getUniversityFees);
router.get("/:universityId/dates", getUniversityDates);
router.get("/:universityId/admissions", getUniversityAdmissions);
router.get("/:universityId/documents", getUniversityDocuments);
router.get("/:universityId", getUniversitybyId);
router.get("/:universityId/:type", getUniversityByProgramType);
router.get("/", searchUniversitiesByName); //regex option using query params
router.post("/", ensureAdmin, createUniversity);
router.put("/", ensureAdmin, updateUniversityByName);
router.delete("/", ensureAdmin, deleteUniversityByName);

export default router;
