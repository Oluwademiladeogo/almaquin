import express from "express";
import {
  getAllSecSSchools,
  createSecSchool,
  updateSecSchool,
  deleteSecSchool,
} from "../controllers/secSchool";
import { ensureAdmin } from "../middlewares/auth";

const router = express.Router();

router.get("/", getAllSecSSchools);
router.post("/", ensureAdmin, createSecSchool);
router.put("/", ensureAdmin, updateSecSchool);
router.delete("/", ensureAdmin, deleteSecSchool);

export default router;
