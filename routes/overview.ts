// routes/overview.ts
import { Router } from "express";
import { getAllUniNamesController } from "../controllers/university";
const router = Router();

router.get("/", getAllUniNamesController);

export default router;
