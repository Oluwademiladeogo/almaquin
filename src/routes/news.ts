import { Router } from "express";
import {
  createNews,
  deleteNewsById,
  getAllNews,
  getNewsById,
  updateNewsById,
  searchNewsByTags,
} from "../controllers/news";
import { ensureAdmin } from "../middlewares/auth";

const router = Router();

router.get("/", getAllNews);
router.get("/search", searchNewsByTags);
router.get("/:id", getNewsById);
router.post("/", ensureAdmin, createNews);
router.put("/:id", ensureAdmin, updateNewsById);
router.delete("/:id", ensureAdmin, deleteNewsById);

export default router;
