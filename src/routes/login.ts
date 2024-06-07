import { Router } from "express";
import { loginController } from "../controllers/login";
import { otpVerificationController } from "../controllers/otpVerification";

const router = Router();

router.post("/", loginController);
router.post("/verify-otp", otpVerificationController);
export default router;
