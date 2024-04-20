import { Router } from "express";
import { ensureAdmin } from "../middlewares/auth";
import { addFAQs, deleteFAQs, getFAQs, updateFAQs } from "../controllers/faq";
const router = Router();
router.get("/faq", getFAQs);
router.post("/faq", ensureAdmin, addFAQs);
router.put("/faq", ensureAdmin, updateFAQs);
router.delete("/faq", ensureAdmin, deleteFAQs);

export default router;
