import express, { Request, Response } from "express";
import { signupController } from "../controllers/signup";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { status, message } = await signupController(req.body);
  res.status(status).json(message);
});

export default router;
