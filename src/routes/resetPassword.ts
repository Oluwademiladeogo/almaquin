import { Router } from "express";
import { resetPasswordController } from "../controllers/resetPassword";

const router = Router();

router.post("/", resetPasswordController);

export default router;
