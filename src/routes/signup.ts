import { Router } from "express";
import { signupController } from "../controllers/signup";

const router = Router();

router.post("/", signupController);

export default router;