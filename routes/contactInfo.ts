import { Router } from "express";
import {
  addContactInfo,
  getContactInfo,
  updateContactInfo,
} from "../controllers/contactInfo";
import { ensureAdmin } from "../middlewares/auth";
const router = Router();

router.get("/", getContactInfo);
router.post("/", ensureAdmin, addContactInfo);
router.put("/", ensureAdmin, updateContactInfo);
export default router;
