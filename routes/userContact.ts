import { collectUserMessage } from "../controllers/userContact";

import { Router } from "express";
const router = Router();
router.post("/", collectUserMessage);
export default router;
