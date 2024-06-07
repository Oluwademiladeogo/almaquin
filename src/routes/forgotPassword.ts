import { Router } from "express";
import { forgotPasswordController } from "../controllers/forgotPassword";

const router = Router();

router.post("/forgot-password", forgotPasswordController);

export default router;
