import { Router } from "express";
import { forgotPasswordController } from "../controllers/forgotPassword";

const router = Router();

router.post("/", forgotPasswordController);

export default router;
