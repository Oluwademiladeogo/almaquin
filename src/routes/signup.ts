import { Router } from "express";
import { signupController } from "../controllers/signup";
import { otpVerificationController } from "../controllers/otpVerification";

const router = Router();

router.post("/", signupController);
router.post("/verify-otp", otpVerificationController);

export default router;
