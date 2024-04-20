import { Router } from "express";
import { ensureAdmin } from "../middlewares/auth";
import { addFAQs, deleteFAQs, getFAQs, updateFAQs } from "../controllers/faq";
const router = Router();
router.get("/", getFAQs);
router.post("/", ensureAdmin, addFAQs);
router.put("/", ensureAdmin, updateFAQs);
router.delete("/", ensureAdmin, deleteFAQs);

export default router;
